from flask_cors import CORS
from app import create_app
from flask_jwt_extended import JWTManager
import os

# Crea una instancia de la aplicación Flask utilizando la función de fábrica `create_app`.
app = create_app()

# Configura CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde el origen especificado.
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configura la clave secreta para JWT (JSON Web Token) utilizando una variable de entorno.
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")

# Inicializa el manejador de JWT para la aplicación Flask.
jwt = JWTManager(app)

# Punto de entrada principal para ejecutar la aplicación Flask.
if __name__ == "__main__":
    # Ejecuta la aplicación en modo de depuración, accesible desde cualquier host y en el puerto 3000.
    app.run(debug=True, host="0.0.0.0", port=3000)
