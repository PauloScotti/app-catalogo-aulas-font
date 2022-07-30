import Link from "next/link";
import UsuarioService from '../../../services/UsuarioService';

const usuarioService = new UsuarioService();

export default function CabecalhoPublico() {
    return (
        <div className="container-header">
            <div className="desktop">
                <Link href={'/'}>Módulos</Link>
                <Link href={'/login'}>Login</Link>
            </div>
        </div>
    )

}
