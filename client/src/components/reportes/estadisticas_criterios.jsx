import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const CriteriaStatistics = ({ data, unit }) => {
  console.log(data);
  console.log(unit);

  const totalStudents = data.length;

  // Filtrar estudiantes de bajo rendimiento basado en la suma de las notas de los criterios
  const passedStudents = data.filter((student) => {
    const total =
      student.criterio_1 +
      student.criterio_2 +
      student.criterio_3 +
      student.criterio_4;
    return total >= 7;
  }).length;

  const failedStudents = totalStudents - passedStudents;

  // Calcular los promedios por criterio
  const averageScores = {
    criterio_1: [],
    criterio_2: [],
    criterio_3: [],
    criterio_4: [],
  };

  data.forEach((student) => {
    averageScores.criterio_1.push(student.criterio_1);
    averageScores.criterio_2.push(student.criterio_2);
    averageScores.criterio_3.push(student.criterio_3);
    averageScores.criterio_4.push(student.criterio_4);
  });

  const averageScoreData = [
    {
      criterio: "AA",
      average:
        averageScores.criterio_1.reduce((sum, score) => sum + score, 0) /
        averageScores.criterio_1.length,
    },
    {
      criterio: "APE",
      average:
        averageScores.criterio_2.reduce((sum, score) => sum + score, 0) /
        averageScores.criterio_2.length,
    },
    {
      criterio: "ACD",
      average:
        averageScores.criterio_3.reduce((sum, score) => sum + score, 0) /
        averageScores.criterio_3.length,
    },
    {
      criterio: "EVALUACION",
      average:
        averageScores.criterio_4.reduce((sum, score) => sum + score, 0) /
        averageScores.criterio_4.length,
    },
  ];

  const pieData = [
    { name: "Rendimiento Normal", value: passedStudents },
    { name: "Bajo Rendimiento", value: failedStudents },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">
        Estadísticas del Curso: {unit.displayName}
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0 lg:w-1/2">
          <h3 className="text-lg font-semibold mb-2">
            Promedio de Notas por Criterio
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={averageScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="criterio" stroke="#4B5563" />
              <YAxis domain={[0, 10]} stroke="#4B5563" />
              <Tooltip wrapperClassName="border bg-gray-100" />
              <Bar dataKey="average" fill="#8884d8" />
              <Legend />
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
                  (student.criterio_1 +
                    student.criterio_2 +
                    student.criterio_3 +
                    student.criterio_4),
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
