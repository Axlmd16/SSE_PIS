import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pywhatkit
import time


class Notificaciones:
    """
    Clase para enviar notificaciones a través de correo electrónico y WhatsApp.
    """

    def __init__(self, correo_destinatario, numero_destinatario, mensaje):
        """
        Inicializa la clase Notificaciones con los datos del destinatario y el mensaje.

        :param correo_destinatario: Correo electrónico del destinatario.
        :param numero_destinatario: Número de teléfono del destinatario para WhatsApp.
        :param mensaje: Mensaje a enviar.
        """
        self.correo_destinatario = correo_destinatario
        self.numero_destinatario = numero_destinatario
        self.mensaje = mensaje

    def enviar_notificacion(self):
        """
        Envía el mensaje proporcionado al correo electrónico y WhatsApp del destinatario.
        """
        # Configuración del remitente
        email_del_remitente = "leoare0412@gmail.com"
        contrasena = "ylzb qpga bfrz bzbt"

        # Configuración del correo electrónico
        email_del_destinatario = self.correo_destinatario
        asunto_correo = "Envio de Test"
        mensaje_email = MIMEMultipart()
        mensaje_email["From"] = email_del_remitente
        mensaje_email["To"] = email_del_destinatario
        mensaje_email["Subject"] = asunto_correo
        mensaje_email.attach(MIMEText(self.mensaje, "plain"))

        # Conexión al servidor SMTP
        servidor_smtp = "smtp.gmail.com"
        puerto = 587
        conexion_smtp = smtplib.SMTP(servidor_smtp, puerto)
        conexion_smtp.starttls()
        conexion_smtp.login(email_del_remitente, contrasena)

        # Envío del correo electrónico
        texto_del_mensaje_email = mensaje_email.as_string()
        conexion_smtp.sendmail(
            email_del_remitente, email_del_destinatario, texto_del_mensaje_email
        )
        conexion_smtp.quit()
        print("Correo enviado correctamente a", email_del_destinatario)

        # Pausa antes de enviar el mensaje de WhatsApp
        time.sleep(5)

        # Envío del mensaje de WhatsApp
        pywhatkit.sendwhatmsg_instantly(self.numero_destinatario, self.mensaje)


if __name__ == "__main__":
    notificaciones = Notificaciones(
        "alexjtap2002@gmail.com", "+593967967643", "Este es un mensaje de prueba."
    )
    notificaciones.enviar_notificacion()
