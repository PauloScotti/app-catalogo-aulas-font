import Link from "next/link";
import Botao from '../../componentes/botao';
import InputPublico from "../../componentes/inputPublico";
import UploadImagem from "../../componentes/uploadImagem";
import { useState } from "react";
import UsuarioService from '../../services/UsuarioService';


import imagemEmail from '../../public/imagens/envelope.svg';
import imagemChave from '../../public/imagens/chave.svg';
import usuarioAtivo from '../../public/imagens/usuarioAtivo.svg';
import avatar from '../../public/imagens/avatar.svg';
import nivelAcessoPNG from '../../public/imagens/nivelAcesso.png';
import {validarEmail, validarSenha, validarNome, validarConfirmacaoSenha, validarnivelAcesso} from '../../utils/validadores';
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

export default function Cadastro() {

    const [nome, setNome] = useState("");
    const [nivelAcesso, setNivelAcesso] = useState("");
    const [imagem, setImagem] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmaSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const router = useRouter();

    
    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarEmail(email) 
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmarSenha)
            // && validarnivelAcesso(nivelAcesso)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }

        setEstaSubmetendo(true);

        try{
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", nome);
            corpoReqCadastro.append("email", email);
            corpoReqCadastro.append("senha", senha);
            // corpoReqCadastro.append("nivelAcesso", nivelAcesso);

            if(imagem.arquivo){
                corpoReqCadastro.append('file', imagem.arquivo);
            }

            await usuarioService.cadastroUsuarios(corpoReqCadastro);
            await usuarioService.login({
                login: email,
                senha
            });

            router.push('/');

        } catch(error){
            alert(
                "Erro ao cadastrar o usuário. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return (
        <section className={'paginaCadastro paginaPublica'}>
            <div className="conteudoPaginaPublica conteudoPaginaPublicaCadastro">
                <form onSubmit={aoSubmeter}>
                    <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || avatar?.src}
                        setImagem={setImagem}
                    />
                    <InputPublico
                        imagem={usuarioAtivo}
                        texto="Nome Completo"
                        tipo="nome"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
{/*                     
                    <InputPublico
                        imagem={nivelAcessoPNG}
                        texto="Nível de Acesso"
                        tipo="nivelAcesso"
                        aoAlterarValor={e => setNivelAcesso(e.target.value)}
                        valor={nivelAcesso}
                        mensagemValidacao="O nivel de acesso precisa ser informado"
                        exibirMensagemValidacao={nivelAcesso && !validarnivelAcesso(nivelAcesso)}
                    /> */}

                    <InputPublico
                        imagem={imagemEmail}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O e-mail informado é inválido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao="A senha precisa ter pelo menos 4 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={e => setConfirmaSenha(e.target.value)}
                        valor={confirmarSenha}
                        mensagemValidacao="As senhas precisam ser iguais"
                        exibirMensagemValidacao={confirmarSenha && !validarConfirmacaoSenha(senha, confirmarSenha)}
                    />

                    <Botao
                        texto={"Cadastrar"}
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>
                
                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/login">Faça seu login agora</Link>
                </div>
            </div>
            </section>
    );
}