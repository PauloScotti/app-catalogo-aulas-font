import { useState } from "react";
import Botao from "../../componentes/botao";
import Cabecalho from "../../componentes/layout/Cabecalho";
import Footer from "../../componentes/layout/Footer";
import InputPublico from "../../componentes/inputPublico";
import comAutorizacao from '../../hoc/comAutorizacao';
import ModulosService from "../../services/ModulosService";
import { validaDescricao, validarNome } from "../../utils/validadores";
import AcaoMensagem from "../../componentes/AcaoMensagem";
import UsuarioService from "../../services/UsuarioService";
import CabecalhoPublico from "../../componentes/layout/Cabecalho/cabecalhoPublico";

const moduloService = new ModulosService();
const usuarioService = new UsuarioService();

function CadastroModulos() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

    const estaLogado = usuarioService.estaAutenticadoAdm();

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
        {estaLogado ? <Cabecalho/> : <CabecalhoPublico /> }
        <div className="inputPublicoContainer">
            <AcaoMensagem classe={'salvar'} mensagem={'Salvo com sucesso'} />
            <h1>Cadastro de Módulos</h1>
            <div className="inputPublicoModulos">

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