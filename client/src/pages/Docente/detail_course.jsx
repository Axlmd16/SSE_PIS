import React from "react";

function DetailCourse() {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center w-full mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Detalles del Curso
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
          <img
            src="../../../../public/img/unl.jpg"
            alt="UNL"
            className="w-full object-cover"
            style={{ height: "200px" }}
          />
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed">
              Descripción de la asignatura Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Eius animi quo molestias, vitae
              magni ex unde provident ea, eligendi molestiae suscipit,
              recusandae voluptatibus minima est tempora impedit facere expedita
              explicabo!
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Información Adicional
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatum eligendi est quidem quis rem.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Lista de Tareas
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>Introducción a la asignatura</li>
              <li>Primer Proyecto</li>
              <li>Examen de Mitad de Semestre</li>
              <li>Segundo Proyecto</li>
              <li>Examen Final</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Recursos Adicionales
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Enlaces a libros, artículos, y otros recursos útiles para el
              curso.
            </p>
            <ul className="list-disc list-inside text-blue-600 dark:text-blue-400 mt-2">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Libro de texto principal
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Artículo relevante
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Video tutorial
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCourse;
