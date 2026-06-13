from datetime import datetime
from database.connection import db

class TargetCompany(db.Model):
    __tablename__ = 'target_companies'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    company_name = db.Column(db.String(100), nullable=False)
    application_status = db.Column(db.String(50), default='dream') # 'dream', 'applied', 'interviewing', 'offered', 'rejected'
    application_date = db.Column(db.Date, default=None)
    job_title = db.Column(db.String(100), default=None)
    notes = db.Column(db.Text, default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Serializes target company data to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "company_name": self.company_name,
            "application_status": self.application_status,
            "application_date": self.application_date.isoformat() if self.application_date else None,
            "job_title": self.job_title,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
