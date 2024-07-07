import { BookOpen, Folder, Layers } from "lucide-react";
import React, { useState } from "react";
import CourseSelector from "./searchs/CourseSelector";
import StudentTable from "./searchs/StudentTable";
import SubjectSelector from "./searchs/SubjectSelector";
import UnitSelector from "./searchs/UnitSelector";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import Filtred_notes from "./filtred_notes";

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

  const breadcrumbItems = [
    {
      label: "Home",
      link: "/home",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Reportes",
      link: "/reportes",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];

  return (
    <div className="p-6 max-w-full mx-auto font-poppins">
      <header className="text-center mb-6">
        <Bread_Crumbs items={breadcrumbItems} />
        <h1 className="text-3xl font-semibold text-gray-700">
          Informe de Rendimiento de Estudiantes
        </h1>
      </header>

      <div className="p-6 rounded-lg shadow-md border border-gray-300 bg-white">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="flex items-center lg:w-1/2">
            <Folder size={28} className="text-gray-700 mr-4" />
            <CourseSelector onSelectCourse={handleSelectCourse} />
          </div>

          {selectedCourse && (
            <div className="flex items-center ml-auto w-1/2">
              <BookOpen size={28} className="text-gray-700 mr-4" />
              <SubjectSelector
                course={selectedCourse}
                onSelectSubject={handleSelectSubject}
              />
            </div>
          )}
        </div>

        <hr className="my-6 border-gray-500 border-t" />

        {selectedSubject && (
          <>
            <div className="flex justify-end items-center lg:w-1/3 ml-auto mb-4">
              <Layers size={28} className="text-gray-700 mr-4" />
              <UnitSelector
                subject={selectedSubject}
                onSelectUnit={setSelectedUnit}
              />
            </div>
            <div className="">
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
