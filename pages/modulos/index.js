import { useState, useEffect } from "react";
import ModulosService from "../../services/ModulosService";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from "axios";

const modulosService = new ModulosService();

function ListarAulas() {
    const { query } = useRouter()
    const id = query.id;
    const [listaDeAulas, setListaDeAulas] = useState([]);
    modulosService.abrirModulos(id).then((response) => setListaDeAulas(response.data));

    
    return (
        <div className="paginaLogin paginaPublica">
            <div className="modulosContainer">
                <h1>Aulas do Módulo</h1>
                {listaDeAulas.map(dadosAulas => (
                        <>
                        <section className="listaModulos">
                            <Link href={`aulas?id=${dadosAulas._id}`}><p className="nomeModulo"><strong>Nome:</strong> {dadosAulas.nome}</p></Link>
                            <p><strong>Descrição:</strong> {dadosAulas.nome}</p>
                            <p><strong>Quantidade de Aulas:</strong> {dadosAulas.data}</p>
                        </section>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default ListarAulas