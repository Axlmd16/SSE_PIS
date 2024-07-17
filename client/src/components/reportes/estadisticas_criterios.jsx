import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const CriteriaStatistics = ({ data }) => {
  // Procesar los datos para las estadísticas
  const totalStudents = data.length;
  const passedStudents = data.filter((student) =>
    Object.keys(student)
      .filter((key) => key.startsWith("criterio_"))
      .some((key) => student[key] > 7)
  ).length;
  const failedStudents = totalStudents - passedStudents;
  const averageScores = {};

  data.forEach((student) => {
    Object.keys(student)
      .filter((key) => key.startsWith("criterio_"))
      .forEach((key) => {
        if (!averageScores[key]) {
          averageScores[key] = [];
        }
        averageScores[key].push(student[key]);
      });
  });

  const averageScoreData = Object.keys(averageScores).map((key) => ({
    criterio: `Criterio ${key.split("_")[1]}`,
    average:
      averageScores[key].reduce((sum, score) => sum + score, 0) /
      averageScores[key].length,
  }));

  const radarData = averageScoreData.map((item) => ({
    criterio: item.criterio,
    average: item.average,
  }));

  const pieData = [
    { name: "Estudiantes Aprobados", value: passedStudents },
    { name: "Estudiantes Reprobados", value: failedStudents },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Estadísticas del Curso</h2>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0 lg:w-1/2">
          <h3 className="text-lg font-semibold mb-2">
            Promedio de Notas por Criterio
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="criterio" stroke="#4B5563" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#4B5563" />
              <Tooltip wrapperClassName="border bg-gray-100" />
              <Radar
                name="Promedio"
                dataKey="average"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
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
          <li>Estudiantes Aprobados: {passedStudents}</li>
          <li>Estudiantes Reprobados: {failedStudents}</li>
          <li>
            Promedio General del Curso:{" "}
            {(
              data.reduce(
                (sum, student) =>
                  sum +
                  Object.keys(student)
                    .filter((key) => key.startsWith("criterio_"))
                    .reduce(
                      (criterioSum, key) => criterioSum + student[key],
                      0
                    ) /
                    Object.keys(student).filter((key) =>
                      key.startsWith("criterio_")
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

export default CriteriaStatistics;
