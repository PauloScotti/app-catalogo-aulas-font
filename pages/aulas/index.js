import { useState, useEffect } from "react";
import ModulosService from "../../services/ModulosService";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from "axios";

const modulosService = new ModulosService();

function AbrirAula() {
    const { query } = useRouter()
    const id = query.id;
    const [listaAula, setListaAula] = useState([]);
    modulosService.abrirAula(id).then((response) => setListaAula(response.data));

    
    return (
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
    )
}

export default AbrirAula