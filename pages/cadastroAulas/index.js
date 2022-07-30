import { useState } from "react";
import Botao from "../../componentes/botao";
import Cabecalho from "../../componentes/layout/Cabecalho";
import Footer from "../../componentes/layout/Footer";
import InputPublico from "../../componentes/inputPublico";
import comAutorizacao from '../../hoc/comAutorizacao';
import ModulosService from "../../services/ModulosService";
import { validaData, validarNome } from "../../utils/validadores";
import { useRouter } from "next/router";
import AcaoMensagem from "../../componentes/AcaoMensagem";
import CabecalhoPublico from "../../componentes/layout/Cabecalho/cabecalhoPublico";
import UsuarioService from "../../services/UsuarioService";

const moduloService = new ModulosService();
const usuarioService = new UsuarioService();

function CadastroAulas() {

    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const { query } = useRouter();
    
    const id = query.id;
    const estaLogado = usuarioService.estaAutenticadoAdm();

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validaData(data) 
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }

        setEstaSubmetendo(true);

        try{
            const dadosAula = ({
                nome: nome,
                data: data
            });

            await moduloService.cadastrarAulas(id, dadosAula);

            setNome('');
            setData('');

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
            <h1>Cadastro de Aulas</h1>
            <div className="inputPublicoModulos">

                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        texto="Nome da Aula"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O módulo precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                    
                    <InputPublico
                        texto="Data de início"
                        tipo="date"
                        aoAlterarValor={e => setData(e.target.value)}
                        valor={data}
                        mensagemValidacao="A data precisa possuir o dia, mês e ano no formato dd/mm/aaaa"
                        exibirMensagemValidacao={data && !validaData(data)}
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

export default comAutorizacao(CadastroAulas);