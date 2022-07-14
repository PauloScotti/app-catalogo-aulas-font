import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useEffect, useState } from "react";
import ModulosService from '../../services/ModulosService';

const modulosService = new ModulosService();

export default function Teste() {
    const [modulos, setModulos] = useState([]);

        // const listaModulos = modulosService.abrirModulos();

        // setModulos(listaModulos);

    useEffect(() => {
        const consultaModulos = async () => {
            const listaModulos = await modulosService.abrirModulos();
            // const resposta = await response.json();
            console.log(listaModulos);
        };
        consultaModulos();
    }, [setModulos]);

    return (
        <>
        <h1>{modulos}</h1>
        {/* {modulos.map(mod => (
            <h1 key={mod._id}>mod.nome</h1>
        ))} */}
        </>
    );
}