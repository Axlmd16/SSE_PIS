
export const Home_Principal = () => {
    return (
        <div className="bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 min-h-screen flex items-center justify-center dark:bg-gradient-to-bg dark:from-gray-800 dark:via-gray-900 dark:to-gray-950">
            <div className="max-w-4xl px-8 py-12 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg dark:bg-gray-800">
                <div className="text-center mb-8">
                    <img
                        src="../../public/img/unl.jpg"
                        alt="Universidad XYZ"
                        className="mx-auto w-64 h-64 rounded-full shadow-md mb-4 object-cover"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                    <h1 className="text-4xl text-gray-800 font-bold mb-2 dark:text-blue-400">
                        ¡Bienvenido a la Universidad Nacional de Loja!
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-green-500 dark:font-semibold">
                        Donde la excelencia académica y la innovación se encuentran.
                    </p>
                </div>
                <p className="text-lg text-black mb-6 text-justify dark:text-white">
                    Somos una institución de educación superior laica, autónoma, de derecho público, con personería jurídica y sin fines de lucro; de alta calidad académica y humanística. Ofrecemos formación en la modalidad presencial y a distancia, promoviendo a través de la investigación científico-técnica, los problemas del entorno con calidad, pertinencia y equidad.
                </p>
                {/* <p className="text-lg text-gray-700 mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit eos soluta,
                    reprehenderit debitis quae cum harum! Debitis, quas. Odit sed quisquam facilis
                    in, aut commodi pariatur optio laboriosam voluptate quae!
                </p> */}
                <p className="text-lg text-black mb-6 text-justify dark:text-white">
                    Coadyuvamos al desarrollo sustentable de la región y del país, interactuando con la comunidad por medio de propuestas alternativas a los problemas nacionales y con responsabilidad social; reconociendo y promoviendo la diversidad cultural y étnica y la sabiduría popular. Nos apoyamos en los avances científicos y tecnológicos en procura de mejorar la calidad de vida del pueblo ecuatoriano.
                </p>

            </div>
        </div>
    );
};

