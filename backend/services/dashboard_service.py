from models.profile import Profile
from models.skill import Skill
from models.roadmap import Roadmap, RoadmapItem
from models.resume import Resume
from models.target_company import TargetCompany

class DashboardService:
    @staticmethod
    def get_dashboard_data(user_id):
        """Retrieves and calculates all necessary stats for the user's dashboard view."""
        # 1. Profile information & Readiness Score
        profile = Profile.query.filter_by(user_id=user_id).first()
        readiness_score = profile.readiness_score if profile else 0
        
        # Calculate Profile completeness details
        profile_fields = [
            profile.full_name if profile else None,
            profile.target_role if profile else None,
            profile.bio if profile else None,
            profile.experience_level if profile else None,
            profile.github_url if profile else None,
            profile.linkedin_url if profile else None
        ]
        total_fields = len(profile_fields)
        fields_completed = sum(1 for field in profile_fields if field and str(field).strip() != "")
        
        # 2. Resume status (querying resumes table)
        latest_resume = Resume.query.filter_by(user_id=user_id).order_by(Resume.uploaded_at.desc()).first()
        resume_uploaded = latest_resume is not None
        resume_path = latest_resume.file_path if latest_resume else None

        # 3. Skills count
        skills_count = Skill.query.filter_by(user_id=user_id).count()

        # 4. Roadmap progress details
        roadmaps = Roadmap.query.filter_by(user_id=user_id).all()
        total_roadmap_items = 0
        completed_roadmap_items = 0
        
        for rm in roadmaps:
            for item in rm.items:
                total_roadmap_items += 1
                if item.status == 'completed':
                    completed_roadmap_items += 1

        roadmap_progress_percentage = 0.0
        if total_roadmap_items > 0:
            roadmap_progress_percentage = round((completed_roadmap_items / total_roadmap_items) * 100, 1)

        # 5. Target Companies status
        companies = TargetCompany.query.filter_by(user_id=user_id).all()
        companies_stats = {
            "total_companies": len(companies),
            "dream": sum(1 for c in companies if c.application_status == 'dream'),
            "applied": sum(1 for c in companies if c.application_status == 'applied'),
            "interviewing": sum(1 for c in companies if c.application_status == 'interviewing'),
            "offered": sum(1 for c in companies if c.application_status == 'offered'),
            "rejected": sum(1 for c in companies if c.application_status == 'rejected')
        }

        # Combine data
        dashboard_data = {
            "readiness_score": readiness_score,
            "progress_data": {
                "profile": {
                    "fields_completed": fields_completed,
                    "total_fields": total_fields,
                    "is_complete": fields_completed == total_fields
                },
                "resume": {
                    "is_uploaded": resume_uploaded,
                    "resume_path": resume_path
                },
                "skills": {
                    "total_skills": skills_count
                },
                "roadmap": {
                    "total_items": total_roadmap_items,
                    "completed_items": completed_roadmap_items,
                    "progress_percentage": roadmap_progress_percentage
                },
                "applications": companies_stats
            }
        }

        return {"dashboard": dashboard_data, "status": 200}
