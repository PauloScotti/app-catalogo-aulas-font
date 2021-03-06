import { useState, useEffect } from "react";
import ModulosService from "../../services/ModulosService";
import UsuarioService from "../../services/UsuarioService";
import Link from "next/link";
import Cabecalho from "../layout/Cabecalho";
import CabecalhoPublico from "../layout/Cabecalho/cabecalhoPublico";
import Footer from "../layout/Footer";

const modulosService = new ModulosService();
const usuarioService = new UsuarioService();

function ListaModulos() {
    const [listaDeModulos, setListaDemodulos] = useState([]);
    const [moduloId, setModuloId] = useState([]);

    const estaLogado = usuarioService.estaAutenticadoAdm();

    useEffect( () => {
        modulosService.listarModulos().then((response) => setListaDemodulos(response.data))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });

    }, []);

    const deletarModulo = async (idModulo) => {
        
        setModuloId(idModulo);
        setEstaSubmetendo(true);

        try{
            await modulosService.deletarModulos(moduloId);
            console.log(idModulo);

        } catch(error){
            alert(
                "Erro ao deletar o módulo. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return (
        <>
        {estaLogado ? <Cabecalho/> : <CabecalhoPublico /> }
        <div className="paginaPublica">
                <h1>Modulos</h1>
            <div className="modulosContainer">
                {listaDeModulos.map(dadosModulos => (
                        <>
                        <section className="listaModulos">
                            <p key={dadosModulos.nome}><strong>Nome:</strong> {dadosModulos.nome}</p>
                            <p><strong>Descrição:</strong> {dadosModulos.descricao}</p>
                            <p><strong>Quantidade de Aulas:</strong> {dadosModulos.qtdAulas}</p>
                            <Link href={`modulos?id=${dadosModulos._id}`}><p className="nomeModulo">Abrir o módulo</p></Link>
                            <Link href={`editarModulos?id=${dadosModulos._id}`}><p className="nomeModulo">Editar módulo</p></Link>
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

export default ListaModulos