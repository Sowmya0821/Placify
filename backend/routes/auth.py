from flask import Blueprint, request
from services.auth_service import AuthService
from utils.helpers import api_response, error_response
from utils.validators import is_valid_email, is_strong_password
from models.user import User
from database.connection import db

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    """Endpoint for user registration."""
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    result = AuthService.register(email, password)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], {"user": result['user']}, result['status'])


@auth_bp.route('/login', methods=['POST'])
def login():
    """Endpoint for user authentication."""
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    result = AuthService.login(email, password)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(
        True, 
        result['message'], 
        {"access_token": result['access_token'], "user": result['user']}, 
        result['status']
    )


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """Endpoint for password reset request."""
    data = request.get_json() or {}
    email = data.get('email')

    result = AuthService.forgot_password(email)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], None, result['status'])


@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """Endpoint to update a user's password directly in dev/demo mode."""
    data = request.get_json() or {}
    email = data.get('email')
    new_password = data.get('password')

    if not email or not new_password:
        return error_response("Email and new password are required", 400)
        
    if not is_valid_email(email):
        return error_response("Invalid email format", 400)
        
    if not is_strong_password(new_password):
        return error_response("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number", 400)

    user = User.query.filter_by(email=email).first()
    if not user:
        return error_response("Incorrect email or user does not exist", 404)

    try:
        user.set_password(new_password)
        db.session.commit()
        return api_response(True, "Password reset successfully! Please log in with your new password.", None, 200)
    except Exception as e:
        db.session.rollback()
        return error_response(f"Failed to reset password: {str(e)}", 500)

