import React, { useState, useContext } from "react";
import { Context } from "../../store/context";

const PruebaProyeccion = () => {
  const { actions } = useContext(Context);
  const [notaUnidad1, setNotaUnidad1] = useState("");
  const [notaUnidad2, setNotaUnidad2] = useState("");
  const [image, setImage] = useState(null);

  const handleProyeccion = async () => {

    if (!notaUnidad1 || !notaUnidad2) {
      console.error("Por favor ingresa ambas notas.");
      return;
    }

    try {
      const data = {
        notaUnidad1: parseFloat(notaUnidad1),
        notaUnidad2: parseFloat(notaUnidad2),
      };

      console.log({data});

      const imageUrl = await actions.proyeccion_estudiante_unidad_3(data);
      setImage(imageUrl);
    } catch (error) {
      console.error("Error al obtener la proyección", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Proyección de Nota</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nota de Unidad 1:
          </label>
          <input
            type="number"
            value={notaUnidad1}
            onChange={(e) => setNotaUnidad1(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nota de Unidad 2:
          </label>
          <input
            type="number"
            value={notaUnidad2}
            onChange={(e) => setNotaUnidad2(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleProyeccion}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
        >
          Calcular Proyección
        </button>
      </form>
      {image && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Imagen de Proyección de Nota:</h3>
          <img src={image} alt="Proyección de Nota" className="rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default PruebaProyeccion;
