import { useState } from "react";
import Botao from "../../componentes/botao";
import Cabecalho from "../../componentes/Cabecalho";
import Footer from "../../componentes/Footer";
import InputPublico from "../../componentes/inputPublico";
import comAutorizacao from '../../hoc/comAutorizacao';
import ModulosService from "../../services/ModulosService";
import { validaDescricao, validarNome } from "../../utils/validadores";

import usuarioAtivo from '../../public/imagens/usuarioAtivo.svg';

const moduloService = new ModulosService();

function CadastroModulos() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validaDescricao(descricao) 
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }

        setEstaSubmetendo(true);

        try{
            await moduloService.cadastrarModulos({
                nome: nome,
                descricao: descricao
            });

            setNome('');
            setDescricao('');

        } catch(error){
            alert(
                "Erro ao cadastrar o módulo. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }


    return (
        <>
        <Cabecalho/>
        <div className="inputPublicoContainer">
            <div className="inputPublicoModulos">
            <h1>Cadastro de Módulos</h1>

                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        texto="Nome do Módulo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O módulo precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                    
                    <InputPublico
                        texto="Descrição"
                        tipo="text"
                        aoAlterarValor={e => setDescricao(e.target.value)}
                        valor={descricao}
                        mensagemValidacao="A descrição precisa ter pelo menos 5 caracteres"
                        exibirMensagemValidacao={descricao && !validaDescricao(descricao)}
                    />

                    <Botao
                        texto={"Cadastrar"}
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default comAutorizacao(CadastroModulos);