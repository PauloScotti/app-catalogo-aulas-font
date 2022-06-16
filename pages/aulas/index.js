import { useState, useEffect } from "react";
import ModulosService from "../../services/ModulosService";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from "axios";
import Cabecalho from "../../componentes/Cabecalho";
import Footer from "../../componentes/Footer";

const modulosService = new ModulosService();

function AbrirAula() {
    const { query } = useRouter()
    const id = query.id;
    const [listaAula, setListaAula] = useState([]);
    modulosService.abrirAula(id).then((response) => setListaAula(response.data));

    
    return (
        <><Cabecalho/>
        <div className="paginaLogin paginaPublica">
            <div className="modulosContainer">
                <h1>Aula {listaAula.nome}</h1>
                <>
                <section>
                    <p><strong>Descrição:</strong> {listaAula.nome}</p>
                    <p><strong>Data da Aula:</strong> {listaAula.data}</p>
                </section>
                </>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default AbrirAula