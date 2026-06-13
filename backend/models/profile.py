from datetime import datetime
from database.connection import db

class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False)
    full_name = db.Column(db.String(255), default=None)
    phone = db.Column(db.String(20), default=None)
    bio = db.Column(db.Text, default=None)
    current_role = db.Column(db.String(100), default=None)
    target_role = db.Column(db.String(100), default=None)
    experience_level = db.Column(db.String(50), default=None)
    github_url = db.Column(db.String(255), default=None)
    linkedin_url = db.Column(db.String(255), default=None)
    college_name = db.Column(db.String(255), default=None)
    branch = db.Column(db.String(255), default=None)
    cgpa = db.Column(db.String(20), default=None)
    readiness_score = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Serializes profile details to dictionary."""
        # Retrieve latest resume path dynamically through the user relationship
        latest_resume_path = None
        if self.user and hasattr(self.user, 'resumes') and self.user.resumes:
            # Sort resumes by uploaded_at descending
            sorted_resumes = sorted(self.user.resumes, key=lambda r: r.uploaded_at if r.uploaded_at else datetime.min, reverse=True)
            if sorted_resumes:
                latest_resume_path = sorted_resumes[0].file_path

        return {
            "id": self.id,
            "user_id": self.user_id,
            "full_name": self.full_name,
            "phone": self.phone,
            "bio": self.bio,
            "current_role": self.current_role,
            "target_role": self.target_role,
            "experience_level": self.experience_level,
            "github_url": self.github_url,
            "linkedin_url": self.linkedin_url,
            "college_name": self.college_name,
            "branch": self.branch,
            "cgpa": self.cgpa,
            "resume_path": latest_resume_path,
            "readiness_score": self.readiness_score,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

