import os
import sys
import io
import logging
from sqlalchemy import text

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
from models import db, Doctor, AdminUser
from blueprints.public import public_bp
from blueprints.admin import admin_bp

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for development & production domain flexibility
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)

    # Database Initialization & Auto-Seeding
    with app.app_context():
        try:
            db_uri_preview = Config.SQLALCHEMY_DATABASE_URI.split('@')[-1] if '@' in Config.SQLALCHEMY_DATABASE_URI else Config.SQLALCHEMY_DATABASE_URI
            logging.info(f"Connecting to database: ...@{db_uri_preview}")
            db.create_all()
            logging.info("✅ Database connection verified & tables initialized successfully.")

            # Auto-seed doctors and admin if the database is newly initialized
            try:
                if Doctor.query.count() == 0 or AdminUser.query.count() == 0:
                    logging.info("⚡ Empty database detected. Auto-seeding initial doctors & admin user...")
                    from seed import seed_database_tables
                    seed_database_tables(drop_existing=False)
            except Exception as seed_err:
                logging.warning(f"⚠️ Auto-seed check failed (non-critical): {seed_err}")

        except Exception as db_err:
            logging.error(f"❌ DATABASE INITIALIZATION ERROR: {db_err}")
            logging.error("Check DATABASE_URL or database credentials in Railway environment settings.")

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

    @app.route('/api/health')
    def health():
        db_status = "connected"
        try:
            db.session.execute(text('SELECT 1'))
        except Exception as e:
            db_status = f"disconnected: {str(e)}"

        return jsonify({
            'status': 'ok',
            'server': 'online',
            'database': db_status
        }), 200

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(host='0.0.0.0', port=port, debug=debug)
