from flask_cors import CORS
from app import create_app
from flask import jsonify, make_response, request
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import os

app = create_app()

cors = CORS(app, origins="*")

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
jwt = JWTManager(app)


@app.after_request
def after_request_func(response):
    origin = request.headers.get("Origin")
    if request.method == "OPTIONS":
        response = make_response()
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Headers", "x-csrf-token")
    response.headers.add(
        "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    )
    if origin:
        response.headers.add("Access-Control-Allow-Origin", origin)
    else:
        response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000)
