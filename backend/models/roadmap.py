from datetime import datetime
from database.connection import db

class Roadmap(db.Model):
    __tablename__ = 'roadmaps'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    target_role = db.Column(db.String(100), default=None)
    description = db.Column(db.Text, default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    items = db.relationship('RoadmapItem', backref='roadmap', cascade="all, delete-orphan", order_by="RoadmapItem.order_index")

    def to_dict(self):
        """Serializes roadmap and its items to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "target_role": self.target_role,
            "description": self.description,
            "items": [item.to_dict() for item in self.items],
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


class RoadmapItem(db.Model):
    __tablename__ = 'roadmap_items'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    roadmap_id = db.Column(db.Integer, db.ForeignKey('roadmaps.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, default=None)
    status = db.Column(db.String(50), default='pending') # 'pending', 'in_progress', 'completed'
    order_index = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Serializes individual roadmap item details to dictionary."""
        return {
            "id": self.id,
            "roadmap_id": self.roadmap_id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "order_index": self.order_index,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
