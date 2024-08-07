import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList, // Importa LabelList
} from "recharts";

const CriteriaChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Procesar los datos para el gráfico
  const student = data[0];
  const chartData = Object.keys(student)
    .filter((key) => key.startsWith("criterio_") && !key.includes("nombre"))
    .map((key) => ({
      name: student[`criterio_nombre_${key.split("_")[1]}`],
      score: student[key],
    }));

  return (
    <div className="p-4 bg-white shadow-md rounded-lg dark:bg-gray-800">
      <ResponsiveContainer
        width="70%"
        height={250}
        className="mx-auto dark:text-white"
      >
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#4B5563" />
          <YAxis stroke="#4B5563" domain={[0, 3.5]} />
          <Tooltip wrapperClassName="border bg-gray-100" />
          <Bar dataKey="score" fill="#8884d8" barSize={30}>
            <LabelList dataKey="score" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center mt-4 font-medium dark:text-white">
        Estudiante: {student.nombre}
      </div>
    </div>
  );
};

export default CriteriaChart;
