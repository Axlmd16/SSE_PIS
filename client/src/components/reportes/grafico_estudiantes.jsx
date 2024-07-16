import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const StudentChart = ({ data }) => {
  // Procesar los datos para el gráfico
  const chartData = data.map((student) => {
    const unidades = Object.keys(student).filter((key) =>
      key.startsWith("unidad_")
    );

    const dataObject = {
      nombre: student.nombre,
    };

    unidades.forEach((unidad) => {
      const unidadNumber = unidad.split("_")[1];
      dataObject[`unidad_${unidadNumber}`] = student[unidad];
    });

    return dataObject;
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="nombre" stroke="#4B5563" tick={false} />
          <YAxis stroke="#4B5563" />
          <Tooltip wrapperClassName="border bg-gray-100" />
          <Legend wrapperStyle={{ paddingBottom: "20px" }} />
          <ReferenceLine y={7} stroke="red" strokeDasharray="3 3" />
          {Object.keys(chartData[0])
            .filter((key) => key !== "nombre")
            .map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                name={`Unidad ${key.split("_")[1]}`}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentChart;
