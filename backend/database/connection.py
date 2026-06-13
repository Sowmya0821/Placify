from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import Engine
from sqlalchemy.event import listens_for

# Instantiate the SQLAlchemy object
db = SQLAlchemy()

@listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    """Ensures SQLite enforces foreign key constraints and cascades."""
    # SQLite does not enforce foreign keys by default.
    cursor = dbapi_connection.cursor()
    try:
        cursor.execute("PRAGMA foreign_keys=ON")
    except Exception:
        pass
    finally:
        cursor.close()

def init_db(app):
    """Initializes the database with the Flask app."""
    db.init_app(app)
    
    with app.app_context():
        # Create all database tables based on SQLAlchemy models (if they don't exist)
        db.create_all()

        # Clean up any orphaned profile data where the associated user does not exist.
        # This keeps the SQLite database in a clean, consistent state.
        from models.user import User
        from models.profile import Profile
        try:
            db.session.execute(db.delete(Profile).where(~Profile.user_id.in_(db.select(User.id))))
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            app.logger.warning(f"Startup profile pruning failed: {str(e)}")

