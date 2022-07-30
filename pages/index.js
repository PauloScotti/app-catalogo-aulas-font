import { useState, useEffect } from "react";
import Home from "../componentes/Home";
import HomePublica from "../componentes/Home/HomePublica";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export default function Index() {

  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const token = useState('token', 'tokenAdm');

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticadoAdm()
    );
  }, [token]);

  if(estaAutenticado){
    return (
      <Home/>
    );
  } //https://youtu.be/ne_JZ2AYAos?t=3762

  return <HomePublica />;

}
