import React, { useEffect, useState, useContext } from "react";
import Dropdown from "./dropdown";
import { Context } from "../../../store/context";

const UnitSelector = ({ subject, onSelectUnit }) => {
  const [units, setUnits] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_unidades_por_asignatura(subject.id);
        setUnits(data);
      } catch (error) {
        console.error("Error al obtener las unidades por asignatura", error);
      }
    };

    fetchData();
  }, [actions, subject]);

  return (
    <Dropdown
      options={units}
      onSelect={onSelectUnit}
      displayKey="unidad_nombre"
    />
  );
};

export default UnitSelector;
