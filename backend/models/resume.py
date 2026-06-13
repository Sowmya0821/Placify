from datetime import datetime
from database.connection import db

class Resume(db.Model):
    __tablename__ = 'resumes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    file_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    parsed_content = db.Column(db.Text, default=None)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """Serializes resume info to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "file_name": self.file_name,
            "file_path": self.file_path,
            "parsed_content": self.parsed_content,
            "uploaded_at": self.uploaded_at.isoformat() if self.uploaded_at else None
        }
