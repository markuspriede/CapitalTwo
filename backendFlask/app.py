from flask import Flask, jsonify
from flask_smorest import Api
from flask_jwt_extended import JWTManager
from resources.transaction import blp as BudgetBlueprint
from resources.budget import blp as TransactionBlueprint
from resources.subscription import blp as SubscriptionBlueprint
from resources.user import blp as UserBlueprint

from db import db
from dotenv import load_dotenv 
from flask_cors import CORS, cross_origin
from blocklist import BLOCKLIST
import os

def create_app(db_url=None):
    app = Flask(__name__)
    CORS(app, support_credentials=True)

    if __name__ == "__main__":
        app.run(host="0.0.0.0")

    # will find env file and load the content
    load_dotenv()

    # flask configuration, error at flask extension -> propagate to main
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Capital Two REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    # start of root of API
    app.config["OPENAPI_URL_PREFIX"] = "/" 
    # tell flask-smorest, swagger for api documentation
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    # location of where code live 
    app.config[
        "OPENAPI_SWAGGER_UI_URL"
    ] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    # db_url or os.getenv("DATABASE_URL","sqlite:///data.db")

    app.config['API_SPEC_OPTIONS'] = {  
        'security':[{"bearerAuth": []}],
        'components':{
            "securitySchemes":
                {
                    "bearerAuth": {
                        "type":"http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                    }
                }
        }
    }
    
    # Confiuring database
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DATABASE_URL","sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    db.init_app(app)

    # connect flask-smorest extension to flask app
    api = Api(app)

    app.config["JWT_SECRET_KEY"] = "jose"
    jwt = JWTManager(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        return jwt_payload["jti"] in BLOCKLIST

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {"description": "The token has been revoked.", "error": "token_revoked"}
            ),
            401,
        )

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (
            jsonify({"message": "The token has expired.", "error": "token_expired"}),
            401,
        )

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification failed.", "error": "invalid_token"}
            ),
            401,
        )

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (
            jsonify(
                {
                    "description": "Request does not contain an access token.",
                    "error": "authorization_required",
                }
            ),
            401,
        )

    with app.app_context():
        db.create_all()

    api.register_blueprint(UserBlueprint)
    api.register_blueprint(BudgetBlueprint)
    api.register_blueprint(TransactionBlueprint)
    api.register_blueprint(SubscriptionBlueprint)
    
    return app