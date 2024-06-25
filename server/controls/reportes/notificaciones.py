import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pywhatkit
import time  

class Notificaciones:
    
    def __init__(self, correo_destinatario, numero_destinatario) -> None:
        
        self.correo_destinatario = correo_destinatario
        self.numero_destinatario = numero_destinatario

    def enviar_notificacion(self):
        email_del_remitente = "leoare0412@gmail.com"  
        contrasena = "ylzb qpga bfrz bzbt"

        email_del_destinatario = self.correo_destinatario
        asunto_correo = "Envio de Test"

        numero_whatsapp = self.numero_destinatario
        mensaje = "Hola prueba de test python!"

        mensaje_email = MIMEMultipart()
        mensaje_email["From"] = email_del_remitente
        mensaje_email["To"] = email_del_destinatario
        mensaje_email["Subject"] = asunto_correo
        mensaje_email.attach(MIMEText(mensaje, "plain"))

        servidor_smtp = "smtp.gmail.com"
        puerto = 587
        conexion_smtp = smtplib.SMTP(servidor_smtp, puerto)
        conexion_smtp.starttls()
        conexion_smtp.login(email_del_remitente, contrasena)

        texto_del_mensaje_email = mensaje_email.as_string()
        conexion_smtp.sendmail(email_del_remitente, email_del_destinatario, texto_del_mensaje_email)

        conexion_smtp.quit()
        print("Correo enviado correctamente a", email_del_destinatario)
        time.sleep(5)

        pywhatkit.sendwhatmsg_instantly(numero_whatsapp, mensaje)

if __name__== "__main__":
    noticiaciones = Notificaciones("alexjtap2002@gmail.com", "593967967643")
    noticiaciones.enviar_notificacion()
    
    