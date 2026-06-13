from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.profile_service import ProfileService
from utils.helpers import api_response, error_response

profile_bp = Blueprint('profile', __name__, url_prefix='/api/profile')

@profile_bp.route('', methods=['GET'])
@jwt_required()
def get_profile():
    """Endpoint to fetch current user's profile."""
    user_id = get_jwt_identity()
    result = ProfileService.get_profile(user_id)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, "Profile retrieved successfully", result['profile'], result['status'])


@profile_bp.route('', methods=['POST', 'PUT'])
@jwt_required()
def update_profile():
    """Endpoint to update current user's profile details."""
    user_id = get_jwt_identity()
    data = request.get_json() or {}

    result = ProfileService.update_profile(user_id, data)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], result['profile'], result['status'])
