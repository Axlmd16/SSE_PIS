import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList, // Importa LabelList
} from "recharts";

const StudentChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null; // Retorna null si no hay datos
  }

  const student = data[0]; // Usa el primer (y único) elemento del array
  const chartData = [
    { unidad: "Unidad 1", nota: student.unidad_1 },
    { unidad: "Unidad 2", nota: student.unidad_2 },
    { unidad: "Unidad 3", nota: student.unidad_3 },
  ];

  // Función para determinar el color de la barra
  const getBarColor = (nota) => (nota >= 7 ? "#00C49F" : "#FF8042");

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="unidad" stroke="#4B5563" />
          <YAxis stroke="#4B5563" domain={[0, 10]} />
          <Tooltip wrapperClassName="border bg-gray-100" />
          <Bar dataKey="nota" barSize={30}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.nota)} />
            ))}
            <LabelList dataKey="nota" position="top" />{" "}
            {/* Añade los valores de las notas */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center mt-4 font-medium">
        Estudiante: {student.nombre}
      </div>
    </div>
  );
};

export default StudentChart;
