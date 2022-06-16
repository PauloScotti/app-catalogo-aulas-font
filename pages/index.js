import { useState, useEffect } from "react";
import Cabecalho from "../componentes/Cabecalho";
import Home from "../componentes/Home";
import Login from "../componentes/login";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export default function Index() {

  const [estaAutenticado, setEstaAutenticado] = useState(false);

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticado()
    );
  }, []);

  if(estaAutenticado){
    return (
      <Home/>
    );
  }

  return <Login aposAutenticacao={() => setEstaAutenticado(true)} />;

}
