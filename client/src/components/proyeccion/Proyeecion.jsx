import { BookOpen, Folder, Layers, Download, Share2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import Bread_Crumbs from "../inicio_sesion/bread_crumbs";
import CourseSelector from "../reportes/searchs/CourseSelector";
import SubjectSelector from "../reportes/searchs/SubjectSelector";
import UnitSelector from "../reportes/searchs/UnitSelector";
import TablaEstudianteProyeccion from "./TablaEstudianteProyeccion";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import exportToPDFProyeccion from "./exportToPDFProyeccion";

const MySwal = withReactContent(Swal);

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

  //* PARA UNIDAD 2, PROYECCION UNIDAD 3
  const handleDataSelection = async (data) => {
    setInfoEstudiante(data);
    // console.log({ data });
    setImage(null);
    setIsLoading(true);
    if ((infoEstudiante !== null)) {
      console.log(data.unidad_3)
      try {
        const imageUrl = await actions.proyeccion_estudiante_unidad_3(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //* PARA PROYECCION POR CRITERIO DE EVALUACION
  const handleDataSelectionCriterioEvaluacion = async (data) => {
    setInfoEstudiante(data);
    // console.log({ data });
    setImage(null);
    setIsLoading(true);
    if (infoEstudiante !== null) {
      try {
        const imageUrl = await actions.proyeccion_estudiante_parametros_evaluacion(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //* PARA UNIDAD 3, PROYECCION SUPLETORIO
  const handleDataSelectionSupletorio = async (data) => {
    setInfoEstudiante(data);
    // console.log({ data });
    setImage(null);
    setIsLoading(true);
    const nota_promedio = data.unidad_3 + data.unidad_2 + data.unidad_1
    console.log(nota_promedio);
    if ((infoEstudiante !== null)) {
      console.log(data.unidad_3)
      try {
        const imageUrl = await actions.proyeccion_final_supletorio(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //*PARA PROYECCION DE TODOS LOS ESTUDIANTES PARA NOTA DE UNIDAD 3
  const handleSelectAllStudents = async (data) => {
    // console.log({ data });
    setInfoTodosEstudiantes(data);
    setImage(null);
    setIsLoading(true);
    if (infoTodosEstudiantes !== null) {
      try {
        const imageUrl = await actions.estudiantes_proyecciones_unidad_3(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  //*PARA HACER LA PROYECCION DE TODOS LOS ESTUDIANTES POR CRITERIO DE EVALUACION(DEPENDE DE UNIDAD)
  const handleSelectAllStudentsCriterios = async (data) => {
    // console.log({ data });
    setInfoTodosEstudiantes(data);
    setImage(null);
    setIsLoading(true);
    if (infoTodosEstudiantes !== null) {
      try {
        const imageUrl = await actions.estudiantes_proyecciones_parametros(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //*PARA LA PROYECCION DE TODOS LOS ESTUDIANTES (NOTA FINAL)
  const handleSelectAllStudentsFinalSupletorio = async (data) => {
    // console.log({ data });
    setInfoTodosEstudiantes(data);
    setImage(null);
    setIsLoading(true);
    if (infoTodosEstudiantes !== null) {
      try {
        const imageUrl = await actions.proyeccion_all_estudiantes_final_supletorio(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //*PARA PROYECCION DE TODOS LOS ESTUDIANTES QUE ESTAN EN SUPLETORIO
  const handleSelectAllStudentseEnSupletorio = async (data) => {
    // console.log({ data });
    setInfoTodosEstudiantes(data);
    setImage(null);
    setIsLoading(true);
    if (infoTodosEstudiantes !== null) {
      try {
        const imageUrl = await actions.proyecciones_estudiantes_supletorio(data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      } finally {
        setIsLoading(false);
      }
    }
  };



  //*LLAMAR A LAS FUNCIONES DE PROYECCION
  const llamado_a_las_proyecciones = async (data) => {
    if ("unidad_3" in data) {
      await handleDataSelectionSupletorio(data)
    } else if ("unidad_2" in data) {
      await handleDataSelection(data)
    } else if ("criterio_nombre_1" in data) {
      await handleDataSelectionCriterioEvaluacion(data)
    } else if ("unidad_1" in data) {
      setImage(null)
      MySwal.fire({
        icon: "info",
        title: "Informacion Insufeciente para Proyeccion",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  //*LLAMAR A LAS FUNCIONES DE PROYECCIONES DE TODOS LOS ESTUDIANTES
  const llamador_a_las_proyecciones_todos_estudiantes = async (data) => {
    if ("unidad_3" in data[0]) {
      // Mostrar ventana emergente con opciones
      const result = await MySwal.fire({
        title: 'Selecciona una opción',
        text: '¿Qué quieres hacer?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Notas finales',
        cancelButtonText: 'Ver estudiantes supletorios',
      });

      if (result.isConfirmed) {
        // Opción "Notas finales" seleccionada
        await handleSelectAllStudentsFinalSupletorio(data);
      } else if (result.isDismissed) {
        // Opción "Ver estudiantes supletorios" seleccionada
        await handleSelectAllStudentseEnSupletorio(data);
      }
    } else if ("unidad_2" in data[0]) {
      await handleSelectAllStudents(data);
    } else if ("criterio_nombre_1" in data[0]) {
      await handleSelectAllStudentsCriterios(data);
    } else if ("unidad_1" in data[0]) {
      setImage(null);
      MySwal.fire({
        icon: "info",
        title: "Información Insuficiente para Proyección",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleDownloadPDF = () => {
    exportToPDFProyeccion(image, selectedCourse, selectedSubject, selectedUnit, "download", null, actions);
  };

  const handleSharePDF = async () => {
    // Solicitar email al usuario
    const { value: email } = await MySwal.fire({
      title: 'Enviar Proyeccion',
      input: 'email',
      inputLabel: 'Ingrese el gmail',
      inputPlaceholder: 'Gmail',
    });
      if (email) {
        exportToPDFProyeccion(image, selectedCourse, selectedSubject, selectedUnit, "share", email, actions);
        Swal.fire(`Informe enviado a ${email}`);
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
              <div className="mt-6 text-center bg-gray-400 p-6 rounded-lg shadow-sm dark:bg-gray-900">
                {isLoading ? (
                  <p className="text-white font-bold text-2xl">Cargando...</p>
                ) : (
                  image && (
                    <div>

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
                      <div className="mt-6 flex justify-center space-x-4">
                        <button
                          onClick={handleDownloadPDF}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          <Download size={16} className="inline mr-2" />
                          Descargar PDF
                        </button>
                        <button
                          onClick={handleSharePDF}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                          <Share2 size={16} className="inline mr-2" />
                          Compartir PDF
                        </button>
                      </div>
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
                    onDataSelect={llamado_a_las_proyecciones}
                    onDataSelectAll={llamador_a_las_proyecciones_todos_estudiantes}
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