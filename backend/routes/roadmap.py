from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.roadmap_service import RoadmapService
from utils.helpers import api_response, error_response

roadmap_bp = Blueprint('roadmap', __name__, url_prefix='/api/roadmap')

@roadmap_bp.route('', methods=['GET'])
@jwt_required()
def get_roadmaps():
    """Endpoint to fetch current user's career roadmaps."""
    user_id = get_jwt_identity()
    result = RoadmapService.get_roadmaps(user_id)
    return api_response(True, "Roadmaps retrieved successfully", result['roadmaps'], result['status'])


@roadmap_bp.route('', methods=['POST'])
@jwt_required()
def create_roadmap():
    """Endpoint to generate and seed a new career path roadmap based on target role."""
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    title = data.get('title')
    target_role = data.get('target_role')
    description = data.get('description')

    result = RoadmapService.create_roadmap(user_id, title, target_role, description)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], result['roadmap'], result['status'])


@roadmap_bp.route('/item/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_item_status(item_id):
    """Endpoint to update status of a specific milestone item in a user's roadmap."""
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    status = data.get('status') # 'pending', 'in_progress', 'completed'

    result = RoadmapService.update_item_status(user_id, item_id, status)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], result['item'], result['status'])
