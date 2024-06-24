from dotenv import load_dotenv
import oracledb
import os


class ConnectionDB:
    def __init__(self):
        load_dotenv()
        self.__db = None

    @property
    def _db(self):
        return self.__db

    @_db.setter
    def _db(self, value):
        self.__db = value

    def connection(self):
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
        try:
            self._db.close()
        except Exception as e:
            raise Exception(f"Error closing the connection: {e}")

    def fetchall_to_dict(self, cursor):
        columns = [i[0].lower() for i in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

    def commit(self):
        self._db.commit()
