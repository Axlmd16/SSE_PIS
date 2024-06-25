import {useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../../store/context";

const TablaCalificaciones = () => {
    let { id_asignacion, asignatura_nombre } = useParams();

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Estudiantes, setEstudiantes] = useState([]);
    const { actions } = useContext(Context);

    const handleCellChange = (rowIndex, colIndex, newValue) => {
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][colIndex] = newValue;
        setTableData(updatedTableData);
    };

    const handleSendJson = () => {
        const jsonData = JSON.stringify(tableData);
        console.log(jsonData);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data_cursa = await actions.get_all_cursas();
                const data_estudiantes_cursa = await actions.get_all_estudiantes_cursas();

                const curso = data_cursa.find((item) => item.asignacion_id == id_asignacion);
                console.log(curso);
                const estudiantes = data_estudiantes_cursa.filter((item) => item.cursa_id == curso.id);
                console.log(estudiantes);
                const initialTableData = estudiantes.map((estudiante) => {
                    return [
                        `${estudiante.primer_nombre} ${estudiante.segundo_nombre} ${estudiante.primer_apellido} ${estudiante.segundo_apellido}`,
                        '',
                        '',
                        ''
                    ];
                });
                setEstudiantes(estudiantes);
                setTableData(initialTableData);
            } catch (error) {
                // console.error("Error al obtener la información:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [actions, id_asignacion]);

    if (loading) {
        return <p className="text-center mt-5 font-bold text-2xl">Cargando...</p>;
    }

    return (
        <div className="p-4">
            <div>
                <div>
                    <Link to={"/cursos_docente"} className="bg-gray-800 text-white font-bold p-3 rounded-lg">
                        Regresar
                    </Link>
                </div>
                <div>
                    <h2 className="text-center text-3xl font-bold mb-5">Calificaciones {asignatura_nombre}</h2>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {tableData.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <input
                            key={`${rowIndex}-${colIndex}`}
                            type="text"
                            value={cell}
                            onChange={(e) =>
                                handleCellChange(rowIndex, colIndex, e.target.value)
                            }
                            className="border border-gray-300 px-4 py-2 bg-gray-200 font-bold rounded-lg"
                        />
                    ))
                )}
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4"
                onClick={handleSendJson}
            >
                Enviar JSON
            </button>
        </div>
    );
};

export default TablaCalificaciones;