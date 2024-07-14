import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../store/context";
import Dropdown from "./dropdown";

const CourseSelector = ({ onSelectCourse }) => {
  const [cursos, setCursos] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_cursos_info();
        const updatedData = data.map((curso) => ({
          ...curso,
          displayName: `${curso.ciclo_nombre} - ${curso.paralelo}`,
        }));
        setCursos(updatedData);
      } catch (error) {
        console.error("Error al obtener los cursos", error);
      }
    };

    fetchData();
  }, [actions]);

  return (
    <Dropdown
      options={cursos}
      onSelect={onSelectCourse}
      displayKey="displayName" // Usar la nueva propiedad concatenada
    />
  );
};

export default CourseSelector;
