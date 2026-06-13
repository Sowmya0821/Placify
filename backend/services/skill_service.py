from database.connection import db
from models.skill import Skill
from services.profile_service import ProfileService

class SkillService:
    @staticmethod
    def get_skills(user_id):
        """Retrieves all skills for a user."""
        skills = Skill.query.filter_by(user_id=user_id).all()
        return {"skills": [skill.to_dict() for skill in skills], "status": 200}

    @staticmethod
    def add_skill(user_id, skill_name, proficiency):
        """Adds a new skill to the user's profile."""
        if not skill_name:
            return {"error": "Skill name is required", "status": 400}
            
        proficiency = proficiency or 'Beginner'
        if proficiency not in ['Beginner', 'Intermediate', 'Advanced']:
            return {"error": "Proficiency must be one of: Beginner, Intermediate, Advanced", "status": 400}

        try:
            # Avoid duplicate skill names for the same user
            existing_skill = Skill.query.filter_by(user_id=user_id, skill_name=skill_name).first()
            if existing_skill:
                return {"error": f"Skill '{skill_name}' is already added. Please update it instead.", "status": 409}

            new_skill = Skill(
                user_id=user_id,
                skill_name=skill_name,
                proficiency=proficiency
            )
            db.session.add(new_skill)
            db.session.commit()

            # Recalculate readiness score
            ProfileService.recalculate_readiness_score(user_id)

            return {"message": "Skill added successfully", "skill": new_skill.to_dict(), "status": 201}
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to add skill: {str(e)}", "status": 500}

    @staticmethod
    def update_skill(user_id, skill_id, data):
        """Updates an existing skill's details."""
        skill = Skill.query.filter_by(id=skill_id, user_id=user_id).first()
        if not skill:
            return {"error": "Skill not found or access denied", "status": 404}

        skill.skill_name = data.get('skill_name', skill.skill_name)
        
        proficiency = data.get('proficiency', skill.proficiency)
        if proficiency not in ['Beginner', 'Intermediate', 'Advanced']:
            return {"error": "Proficiency must be one of: Beginner, Intermediate, Advanced", "status": 400}
        skill.proficiency = proficiency

        try:
            db.session.commit()
            return {"message": "Skill updated successfully", "skill": skill.to_dict(), "status": 200}
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to update skill: {str(e)}", "status": 500}

    @staticmethod
    def delete_skill(user_id, skill_id):
        """Deletes a skill from the user's profile."""
        skill = Skill.query.filter_by(id=skill_id, user_id=user_id).first()
        if not skill:
            return {"error": "Skill not found or access denied", "status": 404}

        try:
            db.session.delete(skill)
            db.session.commit()

            # Recalculate readiness score
            ProfileService.recalculate_readiness_score(user_id)

            return {"message": "Skill deleted successfully", "status": 200}
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to delete skill: {str(e)}", "status": 500}
