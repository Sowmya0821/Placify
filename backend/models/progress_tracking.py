from datetime import datetime
from database.connection import db

class ProgressTracking(db.Model):
    __tablename__ = 'progress_tracking'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    item_type = db.Column(db.String(50), nullable=False) # 'roadmap_item', 'interview_question'
    item_id = db.Column(db.Integer, nullable=False) # references roadmap_items.id or interview_questions.id
    status = db.Column(db.String(50), default='pending') # 'pending', 'in_progress', 'completed'
    last_accessed_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Unique constraint on user_id, item_type, and item_id
    __table_args__ = (
        db.UniqueConstraint('user_id', 'item_type', 'item_id', name='uq_user_item'),
    )

    def to_dict(self):
        """Serializes progress tracking entry details to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "item_type": self.item_type,
            "item_id": self.item_id,
            "status": self.status,
            "last_accessed_at": self.last_accessed_at.isoformat() if self.last_accessed_at else None
        }
