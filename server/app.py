import os
import sys
import io

# Windows UTF-8 fix — emoji aur unicode characters print karne ke liye
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

from dotenv import load_dotenv
load_dotenv()  # .env file se environment variables load karo (FAST2SMS_API_KEY, etc.)

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from blueprints.public import public_bp
from blueprints.admin import admin_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for development & production domain flexibility
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    with app.app_context():
        db.create_all()

    jwt = JWTManager(app)

    @jwt.unauthorized_loader
    def unauthorized_callback(callback):
        return jsonify({
            'success': False,
            'error': 'Missing or invalid Authorization Bearer Token'
        }), 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            'success': False,
            'error': 'Token has expired. Please login again.'
        }), 401

    # Register blueprints
    app.register_blueprint(public_bp, url_prefix='/api')
    app.register_blueprint(admin_bp, url_prefix='/api')

    @app.route('/')
    def index():
        return jsonify({
            'name': 'Rekha Eye Hospital (REH) API Server',
            'version': '1.0.0',
            'status': 'healthy'
        }), 200

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(host='0.0.0.0', port=port, debug=debug)

