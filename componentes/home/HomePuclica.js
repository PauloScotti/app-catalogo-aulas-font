import { useState, useEffect } from "react";
import ModulosService from "../../services/ModulosService";
import Link from "next/link";
import Footer from "../layout/Footer";
import CabecalhoPublico from "../layout/Cabecalho/cabecalhoPublico";

const modulosService = new ModulosService();

function HomePublica() {
    const [listaDeModulos, setListaDemodulos] = useState([]);

    useEffect( () => {
        modulosService.listarModulos().then((response) => setListaDemodulos(response.data))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });

    }, []);

    return (
        <div className="paginaPublica">
            <CabecalhoPublico/>
                <h1>Modulos</h1>
            <div className="modulosContainer">
                {listaDeModulos.map(dadosModulos => (
                        <>
                        <section className="listaModulos">
                            <p><strong>Nome:</strong> {dadosModulos.nome}</p>
                            <p><strong>Descrição:</strong> {dadosModulos.descricao}</p>
                            <p><strong>Quantidade de Aulas:</strong> {dadosModulos.qtdAulas}</p>
                            <Link href={`modulos?id=${dadosModulos._id}`}><p className="nomeModulo">Abrir o módulo</p></Link>
                        </section>
                        </>
                    ))
                }
            </div>
        <Footer/>
        </div>
    )
}

export default HomePublica