from flask_cors import CORS
from app import create_app
from flask import jsonify, make_response, request
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import os

app = create_app()

# Configurar CORS usando flask_cors
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
jwt = JWTManager(app)

# Eliminar la función after_request_func si solo se utiliza para CORS
# Si tienes otras configuraciones en after_request_func, mantenlas y elimina solo las líneas relacionadas con CORS

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000)
