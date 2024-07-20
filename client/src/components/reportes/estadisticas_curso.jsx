import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Bar,
  LabelList, // Importa LabelList
  BarChart,
} from "recharts";

const Statistics = ({ data }) => {
  const totalStudents = data.length;

  const passedStudents = data.filter((student) => {
    const unidades = Object.keys(student).filter((key) =>
      key.startsWith("unidad_")
    );
    const average =
      unidades.reduce((sum, key) => sum + student[key], 0) / unidades.length;
    return average >= 7;
  }).length;

  const failedStudents = totalStudents - passedStudents;

  const averageScores = data.reduce((acc, student) => {
    Object.keys(student)
      .filter((key) => key.startsWith("unidad_"))
      .forEach((key) => {
        if (!acc[key]) acc[key] = [];
        acc[key].push(student[key]);
      });
    return acc;
  }, {});

  const averageScoreData = Object.keys(averageScores).map((key) => ({
    name: `Unidad ${key.split("_")[1]}`,
    average: +(
      averageScores[key].reduce((sum, score) => sum + score, 0) /
      averageScores[key].length
    ).toFixed(2),
  }));

  const pieData = [
    { name: "Rendimiento Normal", value: passedStudents },
    { name: "Bajo Rendimiento", value: failedStudents },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6 dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Estadísticas del Curso</h2>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0 lg:w-1/2">
          <h3 className="text-lg font-semibold mb-2">
            Promedio de Notas por Unidad
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={averageScoreData}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip wrapperClassName="border bg-gray-100" />
              <Bar
                dataKey="average"
                fill="#8884d8"
                name="Promedio"
                barSize={80}
              >
                <LabelList dataKey="average" position="top" />{" "}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:w-1/2">
          <h3 className="text-lg font-semibold mb-2">
            Distribución de Estudiantes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip wrapperClassName="border bg-gray-100" />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Resumen del Curso</h3>
        <ul className="list-disc pl-5">
          <li>Total de Estudiantes: {totalStudents}</li>
          <li>Estudiantes con bajo rendimiento: {failedStudents}</li>
          <li>Estudiantes con rendimiento normal: {passedStudents}</li>
          <li>
            Promedio General del Curso:{" "}
            {(
              data.reduce(
                (sum, student) =>
                  sum +
                  Object.keys(student)
                    .filter((key) => key.startsWith("unidad_"))
                    .reduce((unitSum, key) => unitSum + student[key], 0) /
                    Object.keys(student).filter((key) =>
                      key.startsWith("unidad_")
                    ).length,
                0
              ) / totalStudents
            ).toFixed(2)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
