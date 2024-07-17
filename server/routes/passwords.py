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
    data = request.json
    email = data["correo"]
    encrypted_id_cuenta = data["id_cuenta_reset_password"]

    print("\n\nEncriptados: ")
    print(encrypted_id_cuenta)
    print(email)
    print("\n\n\n\n")

    token = generate_token()
    token_store[token] = datetime.now() + timedelta(minutes=1)  

    recovery_link = f"http://localhost:5173/reset_password/{token}/{encrypted_id_cuenta}"


    msg = MIMEMultipart()
    print(Config.CORREO)
    msg['From'] = Config.CORREO
    msg['To'] = email
    msg['Subject'] = 'Recuperación de Contraseña'

    button_style = "background-color:#0369a1; border:none; color:white; padding:10px 20px; text-align:center; text-decoration:none; display:inline-block; font-size:14px; margin:0 auto; cursor:pointer; border-radius:5px;"

    html = f"""
    <html>
        <body>
            <p>Hola,</p>
            <p>Recibiste este correo electrónico porque solicitaste restablecer la contraseña de tu cuenta.</p>
            <p>Haz clic en el siguiente botón para restablecer tu contraseña:</p>
            <p style="text-align: center;"><a href="{recovery_link}" style="{button_style}">Restablecer Contraseña</a></p>
            <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo electrónico de forma segura.</p>
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

    return jsonify({"msg": "Correo de recuperación enviado"}), 200

#* VERIFICAR USUARIO
@password.route("/verificar_usuario", methods=["POST"])
def login():
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
    try:
        data = request.json
        token = data["token"]
        if token in token_store:
            if token_store[token] > datetime.now():
                id = data["id_cuenta"]
                id_int = int(id)
                print("1")
                lista_cuenta = cuenta_control._list()
                print("2")
                lista_cuentas_ordenada = lista_cuenta.quick_sort_with_attribute(lista_cuenta.to_array, "_id", 1)
                print("3")
                user_found = lista_cuenta.busqueda_binaria_atribute(lista_cuentas_ordenada,"_id", id_int)
                print("4")
                
                cuenta_control._cuenta._clave = encrypt_password(data["password"])
                print("5")
                cuenta_control._cuenta._usuario = user_found._usuario
                print("6")
                cuenta_control._cuenta._estado = int(user_found._estado)        
                print("7")
                cuenta_control._cuenta._persona_id = int(user_found._persona_id)          
                print("8")
                if cuenta_control.update(id_int):
                    print("9")
                    del token_store[token] 
                    print("10")
                    return jsonify(True), 201
        else:
            print("\n\n\ntoken no encontrado")
            return jsonify(False), 201
    except Exception as e:
        print(f"Error en reset_password: {e}")
        return jsonify("errpr"), 401
    
#* Función para generar un token único
def generate_token():
    random_numbers = [str(random.randint(0, 9)) for _ in range(4)]
    random_string = ''.join(random_numbers)
    return random_string  
