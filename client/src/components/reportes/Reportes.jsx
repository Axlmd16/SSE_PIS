import { BookOpen, Folder } from "lucide-react";
import React, { useState } from "react";
import CourseSelector from "./searchs/CourseSelector";
import StudentTable from "./searchs/StudentTable";
import SubjectSelector from "./searchs/SubjectSelector";
import UnitSelector from "./searchs/UnitSelector";

const Reportes = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedSubject("");
    setSelectedUnit("");
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSelectedUnit("");
  };

  return (
    <div className="p-6 max-w-full mx-auto space-y-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-700">
          Informe de Rendimiento de Estudiantes
        </h1>
      </header>

      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="flex items-center w-full lg:w-1/3">
            <Folder className="text-gray-500 w-6 h-6 mr-2" />
            <CourseSelector onSelectCourse={handleSelectCourse} />
          </div>

          {selectedCourse && (
            <div className="flex items-center w-full lg:w-1/3">
              <BookOpen className="text-gray-500 w-6 h-6 mr-2" />
              <SubjectSelector
                course={selectedCourse}
                onSelectSubject={handleSelectSubject}
              />
            </div>
          )}
        </div>

        {selectedSubject && (
          <>
            <div className="flex justify-end items-center w-full lg:w-1/3 ml-auto">
              <UnitSelector
                subject={selectedSubject}
                onSelectUnit={setSelectedUnit}
              />
            </div>
            <div className="mt-6">
              <StudentTable
                subject={selectedSubject}
                unit={selectedUnit}
                course={selectedCourse}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reportes;
