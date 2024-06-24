import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./store/context"; // Ajusta la ruta según tu estructura de archivos
import Rutas from "./routes";

function App() {
  const { store, actions } = useContext(Context);

  return <Rutas />;
}

export default App;
