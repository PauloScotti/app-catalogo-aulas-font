import Link from "next/link";
import { useRouter } from 'next/router';
import ModulosService from '../../services/ModulosService';

const modulosService = new ModulosService();

export default function Cabecalho() {

    const nomeCompleto = localStorage.getItem('nome');
    const primeiroNome = nomeCompleto?.split(' ')[0] || '';
    const router = useRouter();
    
    const logout = () => {
        modulosService.logout();
        router.push('/');
    }

    return (
        <div className="container-header">
            <div className="desktop">
                <span>{'Olá, ' + primeiroNome}</span>
                <Link href={'/'}>Módulos</Link>
                <button onClick={logout}>Sair</button>
            </div>
        </div>
    )

}
