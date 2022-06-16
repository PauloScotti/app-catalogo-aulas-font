import Link from "next/link";
import { useRouter } from 'next/router';

export default function Cabecalho() {

    const nomeCompleto = localStorage.getItem('nome');
    const primeiroNome = nomeCompleto?.split(' ')[0] || '';
    const router = useRouter();

    const sair = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenAdm');
        localStorage.removeItem('nome');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        router.push('/');
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
