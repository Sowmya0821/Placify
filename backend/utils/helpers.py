from flask import jsonify

def api_response(success, message, data=None, status_code=200):
    """Generates a standardized JSON response for the API."""
    response = {
        "success": success,
        "message": message
    }
    if data is not None:
        response["data"] = data
        
    return jsonify(response), status_code

def error_response(message, status_code=400):
    """Generates a standardized error JSON response."""
    return api_response(success=False, message=message, status_code=status_code)
