import { useState, useEffect } from "react";
import Home from "../componentes/Home";
import Login from "../componentes/login";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export default function Index() {

  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const token = useState('token', 'tokenAdm');

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticado()
    );
  }, [token]);

  if(estaAutenticado){
    return (
      <Home/>
    );
  }

  return <Login aposAutenticacao={() => setEstaAutenticado(true)} />;

}
