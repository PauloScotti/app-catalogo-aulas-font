import Link from "next/link";

export default function Cabecalho() {

    const nomeCompleto = localStorage.getItem('nome');
    const primeiroNome = nomeCompleto?.split(' ')[0] || '';

    const sair = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenAdm');
        localStorage.removeItem('nome');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
    }

    return (
        <div className="container-header">
            <div className="desktop">
                <span>{'Olá, ' + primeiroNome}</span>
                <Link href={'/'}>Módulos</Link>
                <button onClick={sair}>Sair</button>
            </div>
        </div>
    )

}