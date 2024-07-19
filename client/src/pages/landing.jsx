import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => (
  <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
    <div className="max-w-4xl w-full text-center space-y-8">
      <h1 className="text-5xl font-bold text-gray-800">
        Bienvenido a <span className="text-blue-500">UNL</span>
      </h1>
      <p className="text-lg text-gray-600">
        Realiza el seguimiento académico de manera eficiente y accesible.
        ¡Inicia sesión para comenzar!
      </p>
      <div className="space-y-6">
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
        >
          Iniciar Sesión
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 text-left">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Sobre nuestra aplicación
        </h2>
        <p className="text-gray-700 mb-4">
          La UNL ofrece una plataforma integral para la gestión académica,
          brindando herramientas para estudiantes y docentes. Nuestra misión es
          facilitar el acceso a la información académica y mejorar la
          experiencia educativa.
        </p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          quaerat veritatis harum inventore ea, sint voluptas ducimus incidunt
          molestiae reiciendis beatae deleniti, mollitia ipsum fugiat at
          delectus numquam esse laudantium facere eius molestias. Recusandae
          harum consequatur modi quae, iusto ratione? Eligendi, nulla amet magni
          eos labore doloribus sequi sapiente! Molestiae voluptas qui, minima
          incidunt quos quis libero. Molestiae quos sint delectus iure unde a
          eligendi non quae et, ipsa deserunt facilis excepturi exercitationem
          similique reiciendis, suscipit quisquam magnam, fuga nesciunt veniam
          asperiores fugiat. Rerum repellendus, non officia quasi mollitia
          distinctio atque ex, inventore quibusdam cumque quos quisquam
          doloremque doloribus facere!
        </p>
      </div>
    </div>
    <footer className="bg-white text-black py-6 w-full m-10 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link
              to="/autores"
              className="hover:text-purple-700 font-bold transition-colors duration-300"
            >
              Autores
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/Axlmd16/SSE_PIS"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-700 font-bold transition-colors duration-300"
            >
              Git
            </a>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-purple-700 font-bold transition-colors duration-300"
            >
              Documentación
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} UNL - GRUPO PIS Nro 1. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </div>
);

export default Landing;
