from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.dashboard_service import DashboardService
from utils.helpers import api_response, error_response

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('', methods=['GET'])
@jwt_required()
def get_dashboard():
    """Endpoint to fetch aggregated readiness score and progress data for the user dashboard."""
    user_id = get_jwt_identity()
    result = DashboardService.get_dashboard_data(user_id)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, "Dashboard data retrieved successfully", result['dashboard'], result['status'])
