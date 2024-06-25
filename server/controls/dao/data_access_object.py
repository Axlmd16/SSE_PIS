from datetime import datetime
from typing import Type, TypeVar, Generic

import json
import os

import oracledb

from controls.tda.list.linked_list import Linked_List
from controls.dao.connection import ConnectionDB


T = TypeVar("T")


class Data_Access_Object(Generic[T]):
    atype: T

    def _init_(self, atype: T):
        self.atype = atype
        self.name = self.atype._name_.lower()
        self.cnx = ConnectionDB().connection()

    def _list(self) -> T:
        lista = Linked_List()
        cursor = self.cnx._db.cursor()
        cursor.execute(f"SELECT * FROM {self.name}")
        for row in ConnectionDB().fetchall_to_dict(cursor):
            aux = self.atype.deserializable(row)
            lista.add(aux)
        cursor.close()
        return lista

    def _save(self, data: T):
        cursor = None
        try:
            cursor = self.cnx._db.cursor()
            columns = ", ".join(data.serializable().keys())
            placeholders = ", ".join([":" + key for key in data.serializable().keys()])
            sql = f"INSERT INTO {self.name} ({columns}) VALUES ({placeholders})"

            params = {}
            for key, value in data.serializable().items():
                if isinstance(value, datetime):
                    params[key] = value.strftime("%d-%b-%Y")
                else:
                    params[key] = value

            print("SQL:", sql, end="\n\n")
            print("Params:", params)

            cursor.execute(sql, params)
            self.cnx.commit()

        except Exception as e:
            if cursor:
                cursor.close()
            print(f"Error al ejecutar el SQL: {e}")
            self.cnx.rollback()
            raise e

        finally:
            if cursor:
                cursor.close()

    def _save_id(self, data: T):
        cursor = self.cnx._db.cursor()
        data_dict = data.serializable()
        id_present = "id" in data_dict
        if id_present:
            data_dict.pop("id", None)
        columns = ", ".join(data_dict.keys())
        placeholders = ", ".join([":" + key for key in data_dict.keys()])
        sql = f"INSERT INTO {self.name} ({columns}) VALUES ({placeholders})"
        if id_present:
            sql += " RETURNING ID INTO :id"
        params = {}
        for key, value in data_dict.items():
            if isinstance(value, datetime):
                params[key] = value.strftime("%d-%b-%Y")
            else:
                params[key] = value
        if id_present:
            params["id"] = cursor.var(oracledb.NUMBER)
        cursor.execute(sql, params)
        id = int(params["id"].getvalue()[0]) if id_present else None
        print(f"Log: ID: {id}")
        cursor.close()
        self.cnx.commit()
        return id

    def _merge(self, id: int, data: T) -> None:
        cursor = self.cnx._db.cursor()
        columns = ", ".join([f"{key} = :{key}" for key in data.serializable().keys()])
        sql = f"UPDATE {self.name} SET {columns} WHERE ID = :id"

        params = {}
        for key, value in data.serializable().items():
            if isinstance(value, datetime):
                params[key] = value.strftime("%d-%b-%Y")
            else:
                params[key] = value
        params["id"] = id

        cursor.execute(sql, params)
        cursor.close()
        self.cnx.commit()

    def _delete(self, data: T) -> None:
        cursor = self.cnx._db.cursor()
        sql = f"DELETE FROM {self.name} WHERE ID = :id"
        params = {"id": data.serializable()["id"]}
        cursor.execute(sql, params)
        cursor.close()
        self.cnx.commit()

    def _find(self, id: int) -> T:
        cursor = self.cnx._db.cursor()
        sql = f"SELECT * FROM {self.name} WHERE ID = :id"
        params = {"id": id}
        cursor.execute(sql, params)
        row = ConnectionDB().fetchone_to_dict(cursor)
        cursor.close()
        return self.atype.deserializable(row)

    def _transform_(self):
        return json.dumps(
            [self.lista.get(i).serializable() for i in range(self.lista._length)],
            indent=4,
        )

    def _to_dict(self):
        cursor = self.cnx._db.cursor()
        dict = []
        cursor.execute(f"SELECT * FROM {self.name}")
        for row in ConnectionDB().fetchall_to_dict(cursor):
            dict.append(row)
        return dict

    def _delete_compound_key(self, primary_keys: dict) -> None:
        """
        Elimina un registro de una tabla con clave primaria compuesta.

        Args:
        - table_name (str): Nombre de la tabla en la base de datos.
        - primary_keys (dict): Diccionario con las columnas de clave primaria y sus valores.

        Example:
        - primary_keys = {"ROL_ID": 1, "PERMISO_ID": 2}
        """
        cursor = self.cnx._db.cursor()
        columns = ", ".join(primary_keys.keys())
        placeholders = " AND ".join([f"{key} = :{key}" for key in primary_keys.keys()])
        sql = f"DELETE FROM {self.name} WHERE {placeholders}"

        params = {}
        for key, value in primary_keys.items():
            params[key] = value

        cursor.execute(sql, params)
        cursor.close()
        self.cnx.commit()
