from routes.auth import auth_bp
from routes.profile import profile_bp
from routes.resume import resume_bp
from routes.skills import skills_bp
from routes.roadmap import roadmap_bp
from routes.dashboard import dashboard_bp
from routes.interview import interview_bp

def register_blueprints(app):
    """Registers all blueprints on the Flask application instance."""
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(skills_bp)
    app.register_blueprint(roadmap_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(interview_bp)

