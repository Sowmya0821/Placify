from flask_jwt_extended import create_access_token
from database.connection import db
from models.user import User
from models.profile import Profile
from utils.validators import is_valid_email, is_strong_password

class AuthService:
    @staticmethod
    def register(email, password):
        """Registers a new user and creates an associated blank profile."""
        if not email or not password:
            return {"error": "Email and password are required", "status": 400}
        
        if not is_valid_email(email):
            return {"error": "Invalid email format", "status": 400}
            
        if not is_strong_password(password):
            return {"error": "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number", "status": 400}

        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {"error": "User already exists", "status": 409}

        try:
            # Create user
            new_user = User(email=email)
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.flush() # Flushes changes to get the user ID for profile

            # Create associated empty profile
            new_profile = Profile(user_id=new_user.id)
            db.session.add(new_profile)

            db.session.commit()
            return {"message": "User registered successfully", "user": new_user.to_dict(), "status": 201}
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to register user: {str(e)}", "status": 500}

    @staticmethod
    def login(email, password):
        """Authenticates a user and returns a JWT token."""
        if not email or not password:
            return {"error": "Email and password are required", "status": 400}

        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "Incorrect email or user does not exist", "status": 401}
        if not user.check_password(password):
            return {"error": "Incorrect password", "status": 401}


        try:
            # Generate JWT token
            # We can convert user identity to string format (usually user.id is string/int)
            access_token = create_access_token(identity=str(user.id))
            return {
                "message": "Login successful",
                "access_token": access_token,
                "user": user.to_dict(),
                "status": 200
            }
        except Exception as e:
            return {"error": f"Failed to generate session token: {str(e)}", "status": 500}

    @staticmethod
    def forgot_password(email):
        """Handles mock forgot password functionality."""
        if not email:
            return {"error": "Email is required", "status": 400}
            
        if not is_valid_email(email):
            return {"error": "Invalid email format", "status": 400}

        user = User.query.filter_by(email=email).first()
        if not user:
            # Return success even if email is not found to prevent user enumeration attacks
            return {"message": "If the email exists, a password reset link has been sent.", "status": 200}
            
        # In a real application, you would generate a secure token, store it in db/redis, and send an email
        return {
            "message": "Password reset email sent. (MOCK: Link sent successfully to user email)",
            "status": 200
        }
