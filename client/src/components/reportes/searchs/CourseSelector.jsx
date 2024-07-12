import React, { useEffect, useState, useContext } from "react";
import SearchableDropdown from "./SearchableDropdown";
import { Context } from "../../../store/context";

const CourseSelector = ({ onSelectCourse }) => {
  const [cursos, setCursos] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_cursos_info();
        setCursos(data);
      } catch (error) {
        console.error("Error al obtener los cursos", error);
      }
    };

    fetchData();
  }, [actions]);

  return (
    <SearchableDropdown
      options={cursos}
      placeholder="Buscar curso..."
      onSelect={onSelectCourse}
      displayKey="ciclo_nombre"
    />
  );
};

export default CourseSelector;
