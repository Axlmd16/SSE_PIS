import React from "react";

function DetailCourse() {
  return (
    <div>
      <span className="text-2xl">Detalles del Curso</span>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src="../../../../public/img/unl.jpg"
            className="w-full object-cover"
            style={{ height: "200px" }}
          />
          <div className="p-4 mt-5">
            <p className="text-gray-600 text-justify">
              Descripción de la asignatura Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Eius animi quo molestias, vitae
              magni ex unde provident ea, eligendi molestiae suscipit,
              recusandae voluptatibus minima est tempora impedit facere expedita
              explicabo!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-md mt-4">
          <div className="p-4">{/* Contenido */}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailCourse;
