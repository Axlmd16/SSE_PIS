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

    def __init__(self, atype: T):
        self.atype = atype
        self.name = self.atype.__name__.lower()
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
        cursor.execute(sql, params)
        cursor.close()
        self.cnx.commit()

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

    def _merge(self, data: T) -> None:
        cursor = self.cnx._db.cursor()
        columns = ", ".join([f"{key} = :{key}" for key in data.serializable().keys()])
        sql = f"UPDATE {self.name} SET {columns} WHERE ID = :id"
        params = {}
        for key, value in data.serializable().items():
            if isinstance(value, datetime):
                params[key] = value.strftime("%Y-%m-%d %H:%M:%S")
            else:
                params[key] = value
        params["id"] = data.serializable()["id"]
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
        row = cursor.fetchone()
        cursor.close()
        return self.atype.deserializable(row)

    def __transform__(self):
        return json.dumps(
            [self.lista.get(i).serializable() for i in range(self.lista._length)],
            indent=4,
        )

    def _to_dict(self):
        aux = []
        self._list()
        for i in range(self.lista._length):
            aux.append(self.lista.get(i).serializable())
        return aux
