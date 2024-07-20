import { BookOpen, Folder, Layers } from "lucide-react";
import React, { useState, useEffect } from "react";
import CourseSelector from "./searchs/CourseSelector";
import StudentTable from "./searchs/StudentTable";
import SubjectSelector from "./searchs/SubjectSelector";
import UnitSelector from "./searchs/UnitSelector";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";

const Reportes = ({ actions }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [subjectResetKey, setSubjectResetKey] = useState(0);
  const [curso, setCurso] = useState([]);

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
      link: "/reportes",
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
      <div className="p-6 max-w-full flex-grow mx-auto font-poppins bg-gradient-to-br from-white via-white to-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 min-h-screen flex flex-col">
        <header className="text-center mb-6">
          <Bread_Crumbs items={breadcrumbItems} />
          <h1 className="text-3xl font-semibold text-gray-700 dark:text-blue-400">
            Informe de Rendimiento de Estudiantes
          </h1>
        </header>

        <div className="p-6 rounded-lg shadow-md border border-gray-300 bg-white dark:bg-gray-800 dark:text-white dark:border-none flex-grow">
          <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            <div className="flex items-center lg:w-1/5">
              <span className="mx-3">
                <strong>Curso:</strong>
              </span>
              <Folder size={28} className="text-gray-700 mr-4 dark:text-green-700" />
              <CourseSelector onSelectCourse={handleSelectCourse} />
            </div>

            {selectedCourse && (
              <div className="flex items-center ml-auto w-1/3">
                <span className="mx-3">
                  <strong>Asignatura:</strong>
                </span>
                <BookOpen size={28} className="text-gray-700 mr-4 dark:text-green-700" />
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
                      <h2 className="font-bold text-2xl mb-6 dark:text-blue-400">
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
                    <Layers size={28} className="text-gray-700 mr-4 dark:text-green-700" />
                    <UnitSelector
                      subject={selectedSubject}
                      onSelectUnit={setSelectedUnit}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <StudentTable
                    subject={selectedSubject}
                    unit={selectedUnit}
                    course={curso}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
  );
};

export default Reportes;
