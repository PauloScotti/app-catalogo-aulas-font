import Link from "next/link";
import { useRouter } from 'next/router';
import UsuarioService from '../../../services/UsuarioService';

const usuarioService = new UsuarioService();

export default function Cabecalho() {

    const nomeCompleto = localStorage?.getItem('nome');
    const primeiroNome = nomeCompleto?.split(' ')[0] || '';
    const router = useRouter();
    
    const logout = () => {
        usuarioService.logout();
        router.push('/');
    }

    document.title = "Meu site";

    return (
        <div className="container-header">
            <div className="desktop">
                <span>{'Olá, ' + primeiroNome}</span>
                <Link href={'/'}>Módulos</Link>
                <Link href={'/cadastroModulos'}>Cadastros</Link>
                <button onClick={logout}>Sair</button>
            </div>
        </div>
    )

}
