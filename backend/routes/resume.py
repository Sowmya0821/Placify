from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.resume_service import ResumeService
from utils.helpers import api_response, error_response

resume_bp = Blueprint('resume', __name__, url_prefix='/api/resume')

@resume_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_resume():
    """Endpoint to upload a user resume PDF file."""
    user_id = get_jwt_identity()

    if 'resume' not in request.files:
        return error_response("No file parameter 'resume' found in the request", 400)

    file = request.files['resume']
    
    result = ResumeService.upload_resume(user_id, file)
    if 'error' in result:
        return error_response(result['error'], result['status'])

    return api_response(True, result['message'], {"resume_path": result['resume_path']}, result['status'])
