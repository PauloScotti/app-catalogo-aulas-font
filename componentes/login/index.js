import InputPublico from "../inputPublico";
import Image from "next/image";
import Botao from '../botao/';
import Link from "next/link";
import { useState } from "react";

import imagemEmail from '../../public/imagens/envelope.svg';
import imagemChave from '../../public/imagens/chave.svg';
import imagemLogo from '../../public/vercel.svg';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <section className={'paginaLogin paginaPublica'}>
            <div className="logoContainer">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                />
            </div>
            <div className="conteudoPaginaPublica">
                <form>
                    <InputPublico
                        imagem={imagemEmail}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                    />

                    <Botao
                        texto={"Login"}
                        tipo="submit"
                        desabilitado={false}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastroUsuario">Faça seu cadastro agora</Link>
                </div>

            </div>
        </section>
    )
}