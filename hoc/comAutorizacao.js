import { useRouter } from "next/router";
import UsuarioService from "../services/UsuarioService";
import HomePublica from "../componentes/Home/HomePuclica";

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente) {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const router = useRouter();

        if(typeof window !== 'undefined'){
            if(!usuarioService.estaAutenticadoAdm()){
                return (
                    <>
                        <HomePublica />
                    </>
                );
            }


            return <Componente {...props} />
        }

        return null;
    }
}