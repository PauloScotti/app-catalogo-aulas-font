import { useState } from 'react';
import ResultadoModulos from './ResultadoModulos';
import { useRouter } from 'next/router';

export default function Modulos() {
    const [resultadoModulos, setResultadoModulos] = useState([]);
    const [modulosPesquisado, setModuloPesquisado] = useState([]);

    const aoClicarResultadoModulos = (id) => {
        console.log('aoClicarResultadoModulos', {id});
    }

    return (
        <div className='modulosContainer'>
            
        {resultadoModulos.length > 0 && (
            <div className='resultadoModulosContainer'>
                {resultadoModulos.map(dados => (
                    // eslint-disable-next-line react/jsx-key
                    <ResultadoModulos 
                        nome={dados.nome}
                        descricao={dados.descricao}
                        qtdAulas={dados.qtdAulas}
                        key={dados._id}
                        id={dados._id}
                        onClick={aoClicarResultadoModulos}
                    />
                ))}
            </div>
        )}
        </div>
    );
}