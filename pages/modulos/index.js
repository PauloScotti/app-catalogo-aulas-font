import { useState } from "react";
import ModulosService from "../../services/ModulosService";
import Link from "next/link";
import { useRouter } from 'next/router'
import Cabecalho from "../../componentes/layout/Cabecalho";
import CabecalhoPublico from "../../componentes/layout/Cabecalho/cabecalhoPublico";
import Footer from "../../componentes/layout/Footer";
import UsuarioService from "../../services/UsuarioService";
import moment from "moment";

const modulosService = new ModulosService();
const usuarioService = new UsuarioService();

function ListarAulas() {
    const { query } = useRouter()
    const id = query.id;
    const [listaDeAulas, setListaDeAulas] = useState([]);
    modulosService.abrirAulasModulos(id).then((response) => setListaDeAulas(response.data));

    const estaLogado = usuarioService.estaAutenticadoAdm();
    
    return (
        <>
        {estaLogado ? <Cabecalho/> : <CabecalhoPublico /> }
        <div className="paginaPublica">
            <div className="aulasContainer">
                <h1>Aulas do Módulo</h1>
                {estaLogado ? <Link href={`/cadastroAulas?id=${id}`}><p className="link-btn">Cadastrar nova aula</p></Link> : ""}
                {listaDeAulas.map(dadosAulas => (
                        <>
                        <section className="listaAulas">
                            <Link href={`aulas?id=${dadosAulas._id}`}><p className="nomeAula">{dadosAulas.nome}</p></Link>
                            <p><strong>Data da Aula:</strong> {moment(dadosAulas.data).utc().format('DD/MM/Y')}</p>
                            <Link href={`editarAula?id=${dadosAulas._id}`}><p className="nomeModulo">Editar aula</p></Link>
                        </section>
                        </>
                    ))
                }
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default ListarAulas