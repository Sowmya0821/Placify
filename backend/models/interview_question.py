from datetime import datetime
from database.connection import db

# Association table for Question -> Company tagging
question_companies = db.Table('question_companies',
    db.Column('question_id', db.Integer, db.ForeignKey('interview_questions.id', ondelete='CASCADE'), primary_key=True),
    db.Column('company_name', db.String(100), primary_key=True)
)

class InterviewQuestion(db.Model):
    __tablename__ = 'interview_questions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_text = db.Column(db.Text, nullable=False)
    answer_key = db.Column(db.Text, default=None)
    difficulty = db.Column(db.String(50), default='Medium') # 'Easy', 'Medium', 'Hard'
    category = db.Column(db.String(100), default='Technical') # 'Technical', 'Behavioral', 'System Design'
    role_tag = db.Column(db.String(100), default=None) # 'Frontend Developer', 'Backend Developer', etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    companies = db.relationship('InterviewQuestion', secondary=question_companies, 
                                backref=db.backref('questions', lazy='dynamic'))

    def to_dict(self):
        """Serializes interview question details to dictionary."""
        # Simple extraction of company names
        companies_list = []
        try:
            # Query mapped entries in association table for this question
            conn = db.session.connection()
            result = conn.execute(
                question_companies.select().where(question_companies.c.question_id == self.id)
            )
            companies_list = [row[1] for row in result]
        except Exception:
            # Fallback if connection query fails during active transaction tests
            pass

        return {
            "id": self.id,
            "question_text": self.question_text,
            "answer_key": self.answer_key,
            "difficulty": self.difficulty,
            "category": self.category,
            "role_tag": self.role_tag,
            "companies": companies_list,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
