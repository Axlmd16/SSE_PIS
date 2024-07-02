import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/context";
import Dropdown from "./dropdown";

const SubjectSelector = ({ course, onSelectSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_asignaturas_por_curso(course.id);
        setSubjects(data);
      } catch (error) {
        console.error("Error al obtener las asignaturas por curso", error);
      }
    };

    fetchData();
  }, [actions, course]);

  return (
    <Dropdown
      options={subjects}
      label="Seleccione una asignatura"
      onSelect={onSelectSubject}
      displayKey="nombre"
    />
  );
};

export default SubjectSelector;
