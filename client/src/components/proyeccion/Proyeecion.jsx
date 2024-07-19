import { BookOpen, Folder, Layers } from "lucide-react";
import React, { useState, useEffect } from "react";
import Bread_Crumbs from "../inicio_sesion/bread_crumbs";
import CourseSelector from "../reportes/searchs/CourseSelector";
import SubjectSelector from "../reportes/searchs/SubjectSelector";
import UnitSelector from "../reportes/searchs/UnitSelector";
import TablaEstudianteProyeccion from "./TablaEstudianteProyeccion";

const Proyeccion = ({ actions }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [subjectResetKey, setSubjectResetKey] = useState(0);
  const [curso, setCurso] = useState([]);
  const [infoEstudiante, setInfoEstudiante] = useState(null);
  const [infoTodosEstudiantes, setInfoTodosEstudiantes] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDataSelection = async (data) => {
    setInfoEstudiante(data);
    console.log({ data });
    setImage(null);
    setIsLoading(true);
    if (infoEstudiante !== null && data.unidad_1) {
      try {
        const imageUrl = await actions.proyeccion_estudiante_unidad_3(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false); // Finaliza la carga (éxito o error)
      }
    } else if (infoEstudiante !== null && data.criterio_nombre_1) {
      try {
        const imageUrl = await actions.proyeccion_estudiante_parametros_evaluacion(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false); // Finaliza la carga (éxito o error)
      }
    }
    // setInfoEstudiante(null);
  };

  const handleSelectAllStudents = async (data) => {
    console.log({ data });
    setInfoTodosEstudiantes(data); // Guardar todos los estudiantes seleccionados
    // También puedes llamar a funciones adicionales aquí si es necesario
    setImage(null);
    setIsLoading(true);
    if (infoTodosEstudiantes !== null && 'unidad_1' in data[0]) {
      try {
        const imageUrl = await actions.estudiantes_proyecciones_unidad_3(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false); // Finaliza la carga (éxito o error)
      }
    }else if (infoTodosEstudiantes !== null && 'criterio_1' in data[0])  {
      try{
        const imageUrl = await actions.estudiantes_proyecciones_parametros(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false); // Finaliza la carga (éxito o error)
      }
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedSubject("");
    setSelectedUnit("");
    setSubjectResetKey((prevKey) => prevKey + 1);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSelectedUnit("");
  };

  const breadcrumbItems = [
    {
      label: "Home",
      link: "/home",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Reportes",
      link: "/proyeccion",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];

  useEffect(() => {
    if (selectedCourse && selectedSubject) {
      const fetchData = async () => {
        try {
          const data = await actions.get_cursa_id(
            selectedCourse.paralelo,
            selectedSubject.asignatura_id,
            selectedCourse.ciclo_id
          );
          setCurso(data);
        } catch (error) {
          console.error("Error al obtener el curso", error);
        }
      };

      fetchData();
    }
  }, [actions, selectedCourse, selectedSubject]);

  return (
    <div className="p-6 max-w-full mx-auto font-poppins">
      <header className="text-center mb-6">
        <Bread_Crumbs items={breadcrumbItems} />
        <h1 className="text-3xl font-semibold text-gray-700">
          Informe de Rendimiento de Estudiantes
        </h1>
      </header>

      <div className="p-6 rounded-lg shadow-md border border-gray-300 bg-white">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="flex items-center lg:w-1/5">
            <span className="mx-3">
              <strong>Curso:</strong>
            </span>
            <Folder size={28} className="text-gray-700 mr-4" />
            <CourseSelector onSelectCourse={handleSelectCourse} />
          </div>

          {selectedCourse && (
            <div className="flex items-center ml-auto w-1/3">
              <span className="mx-3">
                <strong>Asignatura:</strong>
              </span>
              <BookOpen size={28} className="text-gray-700 mr-4" />
              <SubjectSelector
                course={selectedCourse}
                onSelectSubject={handleSelectSubject}
                resetKey={subjectResetKey}
              />
            </div>
          )}
        </div>

        {selectedSubject && (
          <>
            <div className="mt-16 p-4">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex flex-col lg:flex-row lg:justify-start lg:w-2/3">
                  <div className="mb-4 p-2 w-full lg:w-auto">
                    <h2 className="font-bold text-2xl mb-6">
                      Información del Curso
                    </h2>
                    <div className="flex flex-wrap items-center text-sm">
                      <div className="mr-6 mb-2">
                        <span className="font-semibold mr-1">Curso:</span>
                        <span>
                          {curso.ciclo_nombre} - {curso.paralelo}
                        </span>
                      </div>
                      <div className="mr-6 mb-2 mx-7">
                        <span className="font-semibold mr-1">Asignatura:</span>
                        <span>{selectedSubject.nombre}</span>
                      </div>
                      <div className="mr-6 mb-2 mx-7">
                        {selectedUnit && (
                          <>
                            <span className="font-semibold mr-1">Unidad:</span>
                            <span>{selectedUnit.nro_unidad}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center lg:w-1/5 justify-center">
                  <span className="mx-3 font-bold">Unidad:</span>
                  <Layers size={28} className="text-gray-700 mr-4" />
                  <UnitSelector
                    subject={selectedSubject}
                    onSelectUnit={setSelectedUnit}
                  />
                </div>
              </div>
              <div className="mt-6 text-center bg-gray-400 p-6 rounded-lg shadow-sm">
                {isLoading ? (
                  <p className="text-white font-bold text-2xl">Cargando...</p>
                ) : (
                  image && (
                    <div className="">
                      <h3 className="text-lg font-bold mb-4 text-white">
                        PROYECCION:
                      </h3>
                      <img
                        src={image}
                        alt="Proyección de Nota"
                        className="rounded-lg shadow-lg mx-auto"
                      />
                    </div>
                  )
                )}
              </div>
              <div className="">
                <div className="mt-6">
                  <TablaEstudianteProyeccion
                    subject={selectedSubject}
                    unit={selectedUnit}
                    course={curso}
                    onDataSelect={handleDataSelection}
                    onDataSelectAll={handleSelectAllStudents}
                  />
                </div>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Proyeccion;