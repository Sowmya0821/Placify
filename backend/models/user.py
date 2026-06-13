from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from database.connection import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    profile = db.relationship('Profile', backref='user', uselist=False, cascade="all, delete-orphan")
    skills = db.relationship('Skill', backref='user', cascade="all, delete-orphan")
    roadmaps = db.relationship('Roadmap', backref='user', cascade="all, delete-orphan")
    resumes = db.relationship('Resume', backref='user', cascade="all, delete-orphan")
    progress_tracking = db.relationship('ProgressTracking', backref='user', cascade="all, delete-orphan")
    target_companies = db.relationship('TargetCompany', backref='user', cascade="all, delete-orphan")


    def set_password(self, password):
        """Hashes the password and sets password_hash."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verifies the password against the password_hash."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Serializes user info to dictionary."""
        return {
            "id": self.id,
            "email": self.email,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
