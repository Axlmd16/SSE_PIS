from email import encoders
from email.mime.base import MIMEBase
from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
from datetime import datetime, timedelta
from controls.reportes.util import Util
from config.config import Config

reports = Blueprint("reports", __name__)


@reports.route("/cursos_detalle", methods=["GET"])
def get_cursa_info():
    try:
        data = Util().get_cursos()
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route(
    "/cursa_id/<string:paralelo>/<int:asignatura_id>/<int:ciclo_id>", methods=["GET"]
)
def get_cursa_id(paralelo, asignatura_id, ciclo_id):
    try:
        data = Util().get_cursa_id(paralelo, ciclo_id, asignatura_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/asig_by_curso/<int:ciclo_id>/<string:paralelo>", methods=["GET"])
def get_asignaturas_por_curso(ciclo_id, paralelo):
    try:
        data = Util().get_asignaturas_por_curso(paralelo, ciclo_id)
        print(data)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/units_by_asig/<int:asignatura_id>", methods=["GET"])
def get_units_by_asignatura(asignatura_id):
    try:
        data = Util().get_units_by_asignatura(asignatura_id)
        data = sorted(data, key=lambda x: x["nro_unidad"])

        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/students_by_course/<int:curso_id>", methods=["GET"])
def get_notas_curso_estudiantes(curso_id):
    try:
        data = Util().estudiantes_por_curso(curso_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route(
    "/notes_by_course_students/<string:paralelo>/<int:asignatura_id>/<int:ciclo_id>",
    methods=["GET"],
)
def get_estudiantes_por_curso(paralelo, asignatura_id, ciclo_id):
    try:
        data = Util().get_notas_por_curso_y_estudiantes(
            paralelo, asignatura_id, ciclo_id
        )
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/notes_by_criterio/<int:unidad_id>/<int:cursa_id>", methods=["GET"])
def get_notas_criterio_por_unidad(unidad_id, cursa_id):
    try:
        data = Util().get_notas_criterio_por_unidad(unidad_id, cursa_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Enviar correo con archivo adjunto de notas
@reports.route("/send_email", methods=["POST"])
def send_report_email():
    email = request.form.get("correo")
    file = request.files.get("file")

    print(email)
    print(file)

    if email and file:
        msg = MIMEMultipart()
        msg["From"] = Config.CORREO
        msg["To"] = email
        msg["Subject"] = "Reporte de Rendimiento Académico"

        body = """
        <html>
            <body>
                <p>Hola,</p>
                <p>Adjunto encontrarás el reporte de rendimiento académico solicitado.</p>
                <p>Si tienes alguna duda o inquietud, no dudes en contactarnos.</p>
                <p>Atentamente,</p>
                <p>Equipo de soporte</p>
            </body>
        </html>
        """
        msg.attach(MIMEText(body, "html"))

        part = MIMEBase("application", "octet-stream")
        part.set_payload(file.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",
            f"attachment; filename={file.filename}",
        )
        msg.attach(part)

        try:
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            server.login(Config.CORREO, Config.CLAVE_SECRETA)
            server.sendmail(Config.CORREO, email, msg.as_string())
            server.quit()
            return jsonify({"msg": "Reporte enviado correctamente"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Correo o archivo no proporcionado"}), 400
