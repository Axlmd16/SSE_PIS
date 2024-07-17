import { useContext } from "react";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { User, Key, HelpCircle } from 'lucide-react'; 

const MySwal = withReactContent(Swal);

const CatalogoCard = ({ to, IconComponent, titulo, descripcion }) => (
    <div className='text-center bg-gray-800 p-3 rounded-lg mb-4 w-full transform transition duration-300 ease-in-out hover:scale-105'>
        <Link to={to} className="block h-full">
            <div className="flex flex-col items-center">
                <IconComponent size={24} className="mb-2 text-white" />
                <div className='text-white'>
                    <p className='font-bold text-blue-400'>{titulo}</p>
                    <p className='text-sm'>{descripcion}</p>
                </div>
            </div>
        </Link>
    </div>
);

const CrearCatalogo = () => {
    const { store, actions } = useContext(Context);

    const breadcrumbItems = [
        {
            label: "Home",
            link: "/home",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
        {
            label: "Catalogos",
            link: "/crear-catalogo",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
    ];

    return (
        <div>
            <Bread_Crumbs items={breadcrumbItems} />
            <div className="mt-10 font-poppins flex justify-between items-center">
                <h1 className="text-3xl my-5">Catalogos</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CatalogoCard
                    to="/periodos_academicos"
                    IconComponent={User} 
                    titulo="Periodo Academico"
                    descripcion="Administrar periodos academicos"
                />
                <CatalogoCard
                    to="/generos"
                    IconComponent={Key} 
                    titulo="Genero"
                    descripcion="Administrar generos"
                />
                <CatalogoCard
                    to="/ciclos"
                    IconComponent={HelpCircle} 
                    titulo="Ciclo"
                    descripcion="Administrar Ciclos"
                />
                <CatalogoCard
                    to="/criterio-evaluacion"
                    IconComponent={HelpCircle} 
                    titulo="Criterio Evaluacion"    
                    descripcion="Administrar criterios de evaluacion"
                />
            </div>
        </div>
    );
}

export default CrearCatalogo;
