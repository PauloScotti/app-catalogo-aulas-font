import { useEffect, useState } from "react";
import Botao from "../../componentes/botao";
import Cabecalho from "../../componentes/layout/Cabecalho";
import Footer from "../../componentes/layout/Footer";
import InputPublico from "../../componentes/inputPublico";
import comAutorizacao from '../../hoc/comAutorizacao';
import ModulosService from "../../services/ModulosService";
import { validaDescricao, validarNome } from "../../utils/validadores";
import { useRouter } from "next/router";
import AcaoMensagem from "../../componentes/AcaoMensagem";
import UsuarioService from "../../services/UsuarioService";
import CabecalhoPublico from "../../componentes/layout/Cabecalho/cabecalhoPublico";

const moduloService = new ModulosService();
const usuarioService = new UsuarioService();

function EditarModulos() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const { query } = useRouter();
    const [listaModulo, setListaModulo] = useState([]);
    const [classeAcao, setClasseAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");
    const router = useRouter();
    
    const id = query.id;

    const estaLogado = usuarioService.estaAutenticadoAdm();
    
    useEffect(() => {
        moduloService.abrirModulo(id).then((response) => setListaModulo(response.data));
        setNome(listaModulo.nome);
        setDescricao(listaModulo.descricao)
    }, [id, listaModulo.descricao, listaModulo.nome]);

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
        
        setClasseAcao('salvar');
        setMensagemAcao('Atualizado com sucesso!');
        setEstaSubmetendo(true);
        
        try{
            const dadosAula = ({
                nome: nome,
                data: descricao
            });
            
            await moduloService.editarModulos(id, dadosAula);
            
        } catch(error){
            alert(
                "Erro ao editar o módulo. " + error?.response?.data?.erro
                );
            }
            
            setEstaSubmetendo(false);
        }
        
        const deletarModulo = async (idModulo) => {
            
            setEstaSubmetendo(true);
            setClasseAcao('deletar');
            setMensagemAcao('Deletado com sucesso!');
            
            try{
                await moduloService.deletarModulos(idModulo);
                router.push('/');
                
            } catch(error){
                alert(
                    "Erro ao deletar o módulo. " + error?.response?.data?.erro
                );
            }
    
            setEstaSubmetendo(false);
        }
        
    return (
        <>
        {estaLogado ? <Cabecalho/> : <CabecalhoPublico /> }
        <div className="inputPublicoContainer">
            <AcaoMensagem classe={classeAcao} mensagem={mensagemAcao} />
            <h1>Edição do Módulo</h1>
            <div className="inputPublicoModulos">

                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        texto="Nome do Módulo"
                        tipo="text"
                        valor={nome}
                        aoAlterarValor={e => setNome(e.target.value)}
                        mensagemValidacao="O nome do módulo precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                    
                    <InputPublico
                        texto="Descrição"
                        tipo="text"
                        valor={descricao}
                        aoAlterarValor={e => setDescricao(e.target.value)}
                        mensagemValidacao="A descrição precisa ter mais de 5 caractere"
                        exibirMensagemValidacao={descricao && !validaDescricao(descricao)}
                    />

                    <Botao
                        texto={"Salvar alterações"}
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>
                    <Botao 
                        texto={"Deletar módulo?"}
                        cor="vermelho"
                        tipo="button"
                        manipularClique={() =>  deletarModulo(id)}
                        desabilitado={estaSubmetendo}
                    />
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default comAutorizacao(EditarModulos);