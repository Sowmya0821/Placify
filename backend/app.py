import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from database.connection import init_db
from routes import register_blueprints
from utils.helpers import error_response

def create_app(config_class=Config):
    """Factory function to instantiate, configure, and initialize the Flask application."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize CORS: Allow all origins for dev simplicity, can restrict in production
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize JWT Manager
    jwt = JWTManager(app)

    # Setup custom JWT error handlers for consistent JSON API responses
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "success": False,
            "message": "The token has expired. Please log in again."
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            "success": False,
            "message": "Signature verification failed. Invalid access token."
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            "success": False,
            "message": "Request does not contain a valid authorization header."
        }), 401

    # Ensure upload directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Initialize database
    init_db(app)

    # Register API blueprints/routes
    register_blueprints(app)

    # Base Health Check Route
    @app.route('/', methods=['GET'])
    def health_check():
        return jsonify({
            "success": True,
            "message": "Placify Flask API is online and running.",
            "database_configured": "sqlite" if "sqlite" in app.config['SQLALCHEMY_DATABASE_URI'] else "mysql"
        }), 200

    # Global Error Handlers for API JSON responses
    @app.errorhandler(404)
    def resource_not_found(e):
        return error_response("The requested resource was not found on this server.", 404)

    @app.errorhandler(500)
    def internal_server_error(e):
        return error_response("An internal server error occurred. Please contact the administrator.", 500)

    return app

if __name__ == '__main__':
    # Build and start the app
    flask_app = create_app()
    
    # Run server locally (default port: 5000)
    port = int(os.environ.get('PORT', 5000))
    flask_app.run(host='0.0.0.0', port=port, debug=flask_app.config['DEBUG'])
