from flask import Flask, Blueprint, request, jsonify

from controls.inicio_sesion.cuenta_control import CuentaControl
from controls.inicio_sesion.persona_control import PersonaControl

from controls.tda.list.utilidades import verify_password 
from controls.tda.list.utilidades import encrypt_password

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
from datetime import datetime, timedelta

from config.config import Config

password = Blueprint("password", __name__)


cuenta_control = CuentaControl()
persona_control = PersonaControl()

app = Flask(__name__)

token_store = {}

#* PARA ENVIAR CORREO DE RECUPERACION
@password.route("/send-recovery-email", methods=["POST"])
def send_recovery_email():
    """
    Envia un correo de recuperacion con un enlace para restablecer la contraseña.

    Esta peticion POST recibe el correo electronico y el identificador de cuenta encriptado. Y genera un token de 
    recuperacion. Luego, se envia el correo con el enlace para restablecer la contraseña.

    Returns:
        Respuesta JSON con un mensaje de éxito y estado HTTP 200 si el correo se envia correctamente.
        Respuesta JSON con un mensaje de error y estado HTTP 500 si ocurre un error.
    """
    try:
        data = request.json
        email = data["correo"]
        encrypted_id_cuenta = data["id_cuenta_reset_password"]

        print("\n\nEncriptados: ")
        print(encrypted_id_cuenta)
        print(email)
        print("\n\n\n\n")

        token = generate_token()
        token_store[token] = datetime.now() + timedelta(minutes=1)  
        print(f"Token: {token}")
        print(f"Id encriptado: {encrypted_id_cuenta}")

        recovery_link = f"http://localhost:5173/reset_password/{token}/{encrypted_id_cuenta}"


        msg = MIMEMultipart()
        print(Config.CORREO)
        msg['From'] = Config.CORREO
        msg['To'] = email
        msg['Subject'] = 'Recuperacion de Contraseña'

        button_style = "background-color:#0369a1; border:none; color:white; padding:10px 20px; text-align:center; text-decoration:none; display:inline-block; font-size:14px; margin:0 auto; cursor:pointer; border-radius:5px;"

        html = f"""
        <html>
            <body>
                <p>Hola,</p>
                <p>Recibiste este correo electronico porque solicitaste restablecer la contraseña de tu cuenta.</p>
                <p>Haz clic en el siguiente boton para restablecer tu contraseña:</p>
                <p style="text-align: center;"><a href="{recovery_link}" style="{button_style}">Restablecer Contraseña</a></p>
                <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo electronico de forma segura.</p>
                <p>Gracias,<br>El equipo de soporte</p>
            </body>
        </html>
        """

        msg.attach(MIMEText(html, 'html'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()

        server.login(Config.CORREO, Config.CLAVE_SECRETA)  

        server.sendmail(Config.CORREO, email, msg.as_string())

        server.quit()

        return jsonify({"msg": "Correo de recuperacion enviado"}), 200

    except Exception as e:
        print(f"Error en send_recovery_email: {e}")
        return jsonify({"msg": "Error al enviar el correo de recuperacion"}), 500

#* VERIFICAR USUARIO
@password.route("/verificar_usuario", methods=["POST"])
def login():
    """
    Verifica las credenciales del usuario y retorna los datos del usuario si son correctas.

    Esta peticion POST recibe el usuario y la contrasena en formato JSON. Luego, busca la cuenta y 
    el usuario en la base de datos, verifica la contrasena y retorna los datos del usuario si son correctas.

    Returns:
        Response: JSON con los datos del usuario y estado HTTP 200 si las credenciales son correctas.
        Response: JSON con un mensaje de error y estado HTTP 401 si las credenciales son incorrectas.
        Response: JSON con un mensaje de error y estado HTTP 500 si ocurre un error.
    """
    username = request.json.get("usuario", None)
    password = request.json.get("clave", None)

    try:
        user_found = cuenta_control._list().search_models_binary("usuario", username)
        persona_found = persona_control._list().search_models_binary("id", user_found._persona_id)
        print(f"Persona: {persona_found.serializable()}")
    except Exception as e:
        print(e)
        return jsonify({"msg": "Error al buscar el usuario"}), 500
    
    print("\n\n\n\n")

    if (user_found._usuario == username and user_found._clave == password) or (user_found._usuario == username and verify_password(password, user_found._clave)):

        persona = persona_found.serializable()
        info_cuenta = user_found.serializable()
        
        id_persona = persona["id"]
        primer_nombre = persona["primer_nombre"]
        segundo_nombre = persona["segundo_nombre"]
        primer_apellido = persona["primer_apellido"]
        segundo_apellido = persona["segundo_apellido"]
        id_cuenta = info_cuenta["id"]
        usuario = info_cuenta["usuario"]
        estado = info_cuenta["estado"]
        
        diccionario_data = {
            "id_persona": id_persona,
            "primer_nombre": primer_nombre,
            "segundo_nombre": segundo_nombre,
            "primer_apellido": primer_apellido,
            "segundo_apellido": segundo_apellido,
            "id_cuenta": id_cuenta,
            "usuario": usuario,
            "estado": estado
        }

        return jsonify(diccionario_data), 200

    return jsonify({"msg": "Bad username or password"}), 401

#* Verificar password
@password.route("/verificar_password/<id_cuenta>/<password>", methods=["POST"])
def verificar_password(id_cuenta, password):
    """
    Verifica si la contraseña proporcionada es correcta para la cuenta especifica.

    Esta peticion POST recibe el ID de la cuenta y la contraseña en formato JSON. Busca la cuenta en 
    la base de datos y verifica la contraseña.

    Args:
        id_cuenta (str): ID de la cuenta.
        password (str): Contraseña a verificar.

    Returns:
        Response: JSON con True y estado HTTP 201 si la contraseña es correcta.
        Response: JSON con False y estado HTTP 201 si la contraseña es incorrecta.
        Response: JSON con un mensaje de error y estado HTTP 401 si ocurre un error.
    """
    try:
        verificado = False
        lista_cuenta = cuenta_control._list()
        lista_cuentas_ordenada = lista_cuenta.quick_sort_with_attribute(lista_cuenta.to_array, "_id", 1)
        user_found = lista_cuenta.busqueda_binaria_atribute(lista_cuentas_ordenada,"_id", int(id_cuenta))
       
        if ((user_found._clave == password) or (verify_password(password, user_found._clave))):
            verificado = True
            print("\n\n\n\n\n\n")
            return jsonify(verificado), 201
        else:
            return jsonify(verificado), 201
    except Exception as e:
        return jsonify("Bad username or password"), 401

#* Cambiar password
@password.route("/cambiar_password/<int:id_cuenta>", methods=["PUT"])
def cambiar_password(id_cuenta):
    """
    Cambia la contraseña de la cuenta especificada.

    Esta peticion PUT recibe el ID de la cuenta y la nueva contraseña en formato JSON. Busca la cuenta en 
    la base de datos y cambia la contraseña.

    Args:
        id_cuenta (int): ID de la cuenta.

    Returns:
        Response: JSON con un mensaje de éxito y estado HTTP 201 si la contraseña se cambia correctamente.
        Response: JSON con un mensaje de error y estado HTTP 401 si ocurre un error.
    """
    try:
        print("\n\n\n\n\n\n")

        data = request.json
        
        cuenta_control._cuenta._clave = encrypt_password(data["password"])  
        cuenta_control._cuenta._usuario = data["usuario"]
        cuenta_control._cuenta._estado = int(data["estado"])
        cuenta_control._cuenta._persona_id = int(data["id_persona"]) 
        cuenta_control.update(id_cuenta)
        return jsonify("Password cambiado"), 201
    except Exception as e:
        return jsonify({"msg": "Bad username or password"}), 401

#* Verificar usuario para cambiar password
@password.route("/validar_usuario_cambio_password", methods=["POST"])
def verificar_usuario_cambio_password():
    """
    Verifica si el usuario existe y si el correo coincide para el cambio de contraseña.

    Esta peticion POST recibe el correo y el usuario en formato JSON. Busca la persona y la cuenta en la base de datos, 
    y verifica que el usuario y el correo coincidan.

    Returns:
        Response: JSON con el ID de la cuenta y estado HTTP 201 si el usuario y el correo son correctos.
        Response: JSON con False y estado HTTP 201 si el usuario o el correo son incorrectos.
        Response: JSON con un mensaje de error y estado HTTP 401 si ocurre un error.
    """
    try:
        data = request.json
        num_identificacion = data["numIdentificacion"]
        correo = data["correo"]
        print(data)

        lista_persona = persona_control.list()        
        lista_persona_ordenada = lista_persona.quick_sort_with_attribute(lista_persona.to_array, "_dni", 1)
        persona_found = lista_persona.busqueda_binaria_atribute(lista_persona_ordenada,"_dni", num_identificacion)

        if persona_found == -1:
            return jsonify(False), 201
        
        if correo != persona_found._email:
            return jsonify(False), 201
        
        user_found = cuenta_control._list().search_models_binary("persona_id", persona_found._id)

        if user_found is None:
            return jsonify(False), 201

        return jsonify(user_found._id), 201

    except Exception as e:
        print(f"Error en verificar_usuario_cambio_password: {e}")
        return jsonify(False), 401
  
#* Resetear password
@password.route("/reset_password", methods=["PUT"])
def reset_password():
    """
    Restablece la contraseña de la cuenta utilizando un token de recuperacion.

    Esta peticion PUT recibe el token y la contraseña en formato JSON. Busca la cuenta en la base de datos.
    Luego, verifica el token y la fecha de expiracion. Y cambia la contrasena de la cuenta.

    Returns:
        Response: JSON con un mensaje de éxito y estado HTTP 200 si la contraseña se restablece correctamente.
        Response: JSON con un mensaje de error y estado HTTP 400 si el token es invelido o ha expirado.
    """
    try:
        data = request.json
        # print("1")
        token = data["token"]
        # print("2")
        if token in token_store:
            # print("3")
            if token_store[token] > datetime.now():
                # print("4")
                id_int = int(data["id_cuenta"])  
                # print("5")
                lista_cuenta = cuenta_control._list()
                # print("6")
                lista_cuentas_ordenada = lista_cuenta.quick_sort_with_attribute(lista_cuenta.to_array, "_id", 1)
                # print("7")
                user_found = lista_cuenta.busqueda_binaria_atribute(lista_cuentas_ordenada,"_id", id_int)
                # print("8")
                
                cuenta_control._cuenta._clave = encrypt_password(data["password"])
                # print("9")
                cuenta_control._cuenta._usuario = user_found._usuario
                # print("10")
                cuenta_control._cuenta._estado = int(user_found._estado)        
                # print("11")
                cuenta_control._cuenta._persona_id = int(user_found._persona_id)          
                # print("12")
                if cuenta_control.update(id_int):
                    # print("13")
                    del token_store[token] 
                    # print("14")
                    return jsonify(True), 200
        else:
            print("\n\n\ntoken no encontrado")
            return jsonify(False), 400
    except Exception as e:
        print(f"Error en reset_password: {e}")
        return jsonify("errpr"), 404
    
#* Funcion para generar un token unico
def generate_token():
    """
    Genera un token aleatorio para la recuperacion de contraseña.

    Returns:
        random_string (str): Token aleatorio generado.
    """
    random_numbers = [str(random.randint(0, 9)) for _ in range(4)]
    random_string = ''.join(random_numbers)
    return random_string  
