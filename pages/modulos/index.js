import { useState, useEffect } from "react";
import ModulosService from "../../services/ModulosService";
import Link from "next/link";

const modulosService = new ModulosService();

export default function ListaModulos() {
    const [listaDeModulos, setListaDemodulos] = useState([]);

    useEffect( () => {
        const { data } = modulosService.listarModulos().then((response) => setListaDemodulos(response.data))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });

    }, []);

    return (
        <div className="paginaLogin paginaPublica">
            <div className="modulosContainer">
                <h1>Modulos</h1>
                {listaDeModulos.map(dadosModulos => (
                        <>
                        <section className="listaModulos">
                            <Link href={`modulo?id=${dadosModulos._id}`}><p className="nomeModulo"><strong>Nome:</strong> {dadosModulos.nome}</p></Link>
                            <p><strong>Descrição:</strong> {dadosModulos.descricao}</p>
                            <p><strong>Quantidade de Aulas:</strong> {dadosModulos.qtdAulas}</p>
                        </section>
                        </>
                    ))
                }
            </div>
        </div>
    )
}
