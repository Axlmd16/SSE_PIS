import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const CriteriaChart = ({ data }) => {
  // Procesar los datos para el gráfico
  const chartData = data.map((student) => {
    const criterios = Object.keys(student).filter(
      (key) => key.startsWith("criterio_") && !key.includes("nombre")
    );

    const dataObject = {
      nombre: student.nombre,
    };

    criterios.forEach((criterio) => {
      const criterioNumber = criterio.split("_")[1];
      dataObject[`criterio_${criterioNumber}`] = student[criterio];
    });

    return dataObject;
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="nombre" stroke="#4B5563" />
          <YAxis stroke="#4B5563" />
          <Tooltip wrapperClassName="border bg-gray-100" />
          <Legend wrapperStyle={{ paddingBottom: "20px" }} />
          <ReferenceLine y={7} stroke="red" strokeDasharray="3 3" />
          {Object.keys(chartData[0])
            .filter((key) => key !== "nombre")
            .map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                name={`Criterio ${key.split("_")[1]}`}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CriteriaChart;
