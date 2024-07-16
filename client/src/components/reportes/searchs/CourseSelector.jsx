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

        // Crear un conjunto para eliminar duplicados
        const uniqueCursosSet = new Set();
        const uniqueCursos = data.filter((curso) => {
          const cursoString = `${curso.ciclo_nombre} - ${curso.paralelo}`;
          if (uniqueCursosSet.has(cursoString)) {
            return false;
          }
          uniqueCursosSet.add(cursoString);
          return true;
        });

        // Agregar propiedad displayName
        const updatedData = uniqueCursos.map((curso) => ({
          ...curso,
          displayName: `${curso.ciclo_nombre} - ${curso.paralelo}`,
        }));

        setCursos(updatedData);
      } catch (error) {
        console.error("Error al obtener los cursos", error);
      }
    };

    fetchData();
  }, [actions, setCursos]);

  return (
    <Dropdown
      options={cursos}
      onSelect={onSelectCourse}
      displayKey="displayName" // Usar la nueva propiedad concatenada
    />
  );
};

export default CourseSelector;
