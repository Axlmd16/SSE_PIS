from dotenv import load_dotenv
import oracledb
import os


class ConnectionDB:
    """Clase para manejar la conexión a la base de datos Oracle.

    :param None: No recibe parámetros.
    """

    def __init__(self):
        """Inicializa la clase cargando las variables de entorno y estableciendo la conexión de base de datos como None."""
        load_dotenv()
        self.__db = None

    @property
    def _db(self):
        """Propiedad para obtener la conexión de base de datos.

        :returns: La conexión actual a la base de datos.
        """
        return self.__db

    @_db.setter
    def _db(self, value):
        """Setter para la conexión de base de datos.

        :param value: La nueva conexión de base de datos.
        """
        self.__db = value

    def connection(self):
        """Establece la conexión a la base de datos Oracle.

        :returns: La instancia actual de la clase.
        :raises Exception: Si hay un error al conectar con la base de datos.
        """
        try:
            self._db = oracledb.connect(
                user="SSE",
                password="SSE",
                dsn="localhost:1521/xe",
            )
            return self
        except Exception as e:
            raise Exception(f"Error connecting to the database: {e}")

    def close(self):
        """Cierra la conexión a la base de datos.

        :raises Exception: Si hay un error al cerrar la conexión.
        """
        try:
            self._db.close()
        except Exception as e:
            raise Exception(f"Error closing the connection: {e}")

    def fetchall_to_dict(self, cursor):
        """Convierte todas las filas obtenidas por el cursor a una lista de diccionarios.

        :param cursor: El cursor de la base de datos.
        :returns: Una lista de diccionarios con los datos de las filas.
        """
        columns = [i[0].lower() for i in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

    def commit(self):
        """Realiza un commit de la transacción actual en la base de datos."""
        self._db.commit()

    def fetchone_to_dict(self, cursor):
        """Convierte la primera fila obtenida por el cursor a un diccionario.

        :param cursor: El cursor de la base de datos.
        :returns: Un diccionario con los datos de la primera fila.
        """
        columns = [i[0].lower() for i in cursor.description]
        return dict(zip(columns, cursor.fetchone()))
