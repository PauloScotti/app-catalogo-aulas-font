import { useState } from "react";
import ModulosService from "../../services/ModulosService";
import { useRouter } from 'next/router'
import Cabecalho from "../../componentes/layout/Cabecalho";
import CabecalhoPublico from "../../componentes/layout/Cabecalho/cabecalhoPublico";
import Footer from "../../componentes/layout/Footer";
import UsuarioService from "../../services/UsuarioService";
import moment from 'moment';

const modulosService = new ModulosService();
const usuarioService = new UsuarioService();

function AbrirAula() {
    const { query } = useRouter()
    const id = query.id;
    const [listaAula, setListaAula] = useState([]);
    modulosService.abrirAula(id).then((response) => setListaAula(response.data));

    const estaLogado = usuarioService.estaAutenticadoAdm();
    
    return (
        <>
        {estaLogado ? <Cabecalho/> : <CabecalhoPublico /> }
        <div className="paginaPublica">
            <div className="aulasContainer">
                <h1>Aula {listaAula.nome}</h1>
                <>
                <section className="listaAulas">
                    <p><strong>Nome:</strong> {listaAula.nome}</p>
                    <p><strong>Data da Aula:</strong> {moment(listaAula.data).utc().format('DD/MM/yyyy')}</p>
                </section>
                </>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default AbrirAula