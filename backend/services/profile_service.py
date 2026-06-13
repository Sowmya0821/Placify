import logging
from database.connection import db
from models.profile import Profile
from models.skill import Skill
from models.roadmap import Roadmap, RoadmapItem
from models.resume import Resume
from services.gemini_service import GeminiService

logger = logging.getLogger(__name__)

class ProfileService:

    @staticmethod
    def get_profile(user_id):
        """Retrieves a user profile by user_id."""
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            # Fallback: create profile if it somehow doesn't exist
            profile = Profile(user_id=user_id)
            db.session.add(profile)
            db.session.commit()
        return {"profile": profile.to_dict(), "status": 200}

    @staticmethod
    def update_profile(user_id, data):
        """Updates user profile details and recalculates readiness score."""
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            profile = Profile(user_id=user_id)
            db.session.add(profile)

        # Update fields
        profile.full_name = data.get('full_name', profile.full_name)
        profile.phone = data.get('phone', profile.phone)
        profile.bio = data.get('bio', profile.bio)
        profile.current_role = data.get('current_role', profile.current_role)
        profile.target_role = data.get('target_role', profile.target_role)
        profile.experience_level = data.get('experience_level', profile.experience_level)
        profile.github_url = data.get('github_url', profile.github_url)
        profile.linkedin_url = data.get('linkedin_url', profile.linkedin_url)
        profile.college_name = data.get('college_name', profile.college_name)
        profile.branch = data.get('branch', profile.branch)
        profile.cgpa = data.get('cgpa', profile.cgpa)


        try:
            db.session.commit()
            # Recalculate readiness score
            ProfileService.recalculate_readiness_score(user_id)
            # Re-fetch profile with updated readiness score
            db.session.refresh(profile)
            return {"message": "Profile updated successfully", "profile": profile.to_dict(), "status": 200}
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to update profile: {str(e)}", "status": 500}

    @staticmethod
    def recalculate_readiness_score(user_id):
        """
        Calculates user placement readiness score dynamically using Gemini AI.
        """
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return 0

        try:
            # 1. Fetch user skills list
            skills_list = [s.skill_name for s in Skill.query.filter_by(user_id=user_id).all()]

            # 2. Fetch latest resume text content
            from models.resume import Resume
            latest_resume = Resume.query.filter_by(user_id=user_id).order_by(Resume.uploaded_at.desc()).first()
            resume_text = latest_resume.parsed_content if latest_resume else ""

            # 3. Call Gemini AI evaluation
            ai_data = GeminiService.evaluate_readiness(profile.to_dict(), skills_list, resume_text)
            score = ai_data.get('readiness_score', 50)
        except Exception as eval_err:
            # Safe basic arithmetic fallback if API fails
            logger.error(f"Failed to calculate AI readiness, executing fallback: {str(eval_err)}")
            score = 50
            if profile.full_name and profile.target_role: score += 15
            if Skill.query.filter_by(user_id=user_id).count() >= 3: score += 15
            if Resume.query.filter_by(user_id=user_id).count() > 0: score += 20

        # Ensure score bounds
        score = min(100, max(0, int(score)))

        # Update profile
        profile.readiness_score = score
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()

        return score

