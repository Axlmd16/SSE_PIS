const Tarjeta = ({ imageSrc, name, module, gitLink, email }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xs mx-auto text-white transition-transform duration-300 transform hover:scale-105">
      <div className="flex flex-col items-center">
        <div
          className={`w-24 h-24 rounded-full overflow-hidden ${!imageSrc ? "bg-gray-200" : ""}`}
        >
          {imageSrc ? (
            <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold mt-4 text-center">{name}</h2>
        <p className="text-gray-400 mt-2 text-center">{module}</p>
        {email && (
          <p className="text-gray-700 mt-2">
            <a href={`mailto:${email}`} className="text-gray-300 underline">{email}</a>
          </p>
        )}
        <a
          href={gitLink}
          target="_blank"
          className="text-indigo-300 mt-2 font-bold hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-transparent hover:bg-clip-text"
        >
          Git
        </a>
      </div>
    </div>
  );
};

const Autores = () => {
  const autores = [
    {
      imageSrc: "",
      name: "Leonardo Sebastian Arevalo Armijos",
      module: "Módulo Encargado: Proyecciones",
      gitLink: "https://github.com/",
      email: "juan.c.alverca@unl.edu.ec"
    },
    {
      imageSrc: "",
      name: "Juan Carlos Alverca Beltran",
      module: "Módulo Encargado: Administrativo",
      gitLink: "https://github.com/",
      email: "leonardo.arevalo@unl.edu.ec"
    },
    {
      imageSrc: "",
      name: "Jostin Santiago Jimenez Ulloa",
      module: "Módulo Encargado: Autenticación e Informes",
      gitLink: "https://github.com/",
      email: "jostin.jimenez@unl.edu.ec"
    },
    {
      imageSrc: "",
      name: "Andres Francisco Tapia Marquez",
      module: "Módulo Encargado: Carga de Notas",
      gitLink: "https://github.com/",
      email: "andres.f.tapia@unl.edu.ec"
    },
    {
      imageSrc: "../../public/img/JATM.png",
      name: "Jhostin Alexander Tapia Marquez",
      module: "Módulo Encargado: Academico",
      gitLink: "https://github.com/",
      email: "jhostin.tapia@unl.edu.ec"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8 ">
          AUTORES - PORYECTO INTEGRADOR DE SABERS
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {autores.map((autor, index) => (
            <Tarjeta
              key={index}
              imageSrc={autor.imageSrc}
              name={autor.name}
              module={autor.module}
              gitLink={autor.gitLink}
              email={autor.email}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Autores;
