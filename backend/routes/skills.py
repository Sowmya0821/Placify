from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.skill_service import SkillService
from utils.helpers import api_response, error_response

skills_bp = Blueprint('skills', __name__, url_prefix='/api/skills')

@skills_bp.route('', methods=['GET'])
@jwt_required()
def get_skills():
    """Endpoint to fetch all skills for current user."""
    user_id = get_jwt_identity()
    result = SkillService.get_skills(user_id)
    return api_response(True, "Skills retrieved successfully", result['skills'], result['status'])


@skills_bp.route('', methods=['POST'])
@jwt_required()
def add_skill():
    """Endpoint to add a new skill."""
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    skill_name = data.get('skill_name')
    proficiency = data.get('proficiency')

    result = SkillService.add_skill(user_id, skill_name, proficiency)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], result['skill'], result['status'])


@skills_bp.route('/<int:skill_id>', methods=['PUT'])
@jwt_required()
def update_skill(skill_id):
    """Endpoint to update an existing skill's details."""
    user_id = get_jwt_identity()
    data = request.get_json() or {}

    result = SkillService.update_skill(user_id, skill_id, data)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], result['skill'], result['status'])


@skills_bp.route('/<int:skill_id>', methods=['DELETE'])
@jwt_required()
def delete_skill(skill_id):
    """Endpoint to delete a skill."""
    user_id = get_jwt_identity()

    result = SkillService.delete_skill(user_id, skill_id)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], None, result['status'])
