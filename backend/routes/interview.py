from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.profile import Profile
from services.gemini_service import GeminiService
from utils.helpers import api_response, error_response

interview_bp = Blueprint('interview', __name__, url_prefix='/api/interview')

@interview_bp.route('/questions', methods=['GET'])
@jwt_required()
def get_interview_questions():
    """Endpoint to generate tailored interview questions (Technical or HR) using Gemini AI."""
    user_id = get_jwt_identity()
    
    # Retrieve category filter (defaults to Technical)
    category = request.args.get('category', 'Technical')
    if category not in ['Technical', 'Behavioral', 'System Design']:
         category = 'Technical'

    try:
        # Extract target position from profile
        profile = Profile.query.filter_by(user_id=user_id).first()
        target_role = profile.target_role if profile and profile.target_role else "Software Engineer"

        # Call Gemini questions generator
        result = GeminiService.generate_interview_questions(target_role, category)
        
        if not result or 'questions' not in result:
             return error_response("Failed to generate AI interview questions", 500)
             
        return api_response(True, f"Generated AI {category} questions successfully.", result['questions'], 200)
    except Exception as e:
        return error_response(f"Interview question generation error: {str(e)}", 500)
