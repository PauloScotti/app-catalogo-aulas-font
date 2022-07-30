import { useEffect, useState } from "react";
import Botao from "../../componentes/botao";
import Cabecalho from "../../componentes/layout/Cabecalho";
import Footer from "../../componentes/layout/Footer";
import InputPublico from "../../componentes/inputPublico";
import comAutorizacao from '../../hoc/comAutorizacao';
import ModulosService from "../../services/ModulosService";
import { validaData, validarNome } from "../../utils/validadores";
import { useRouter } from "next/router";
import AcaoMensagem from "../../componentes/AcaoMensagem";
import UsuarioService from "../../services/UsuarioService";
import CabecalhoPublico from "../../componentes/layout/Cabecalho/cabecalhoPublico";
import moment from "moment";

const moduloService = new ModulosService();
const usuarioService = new UsuarioService();

function EditarAula() {

    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const { query } = useRouter();
    const [listaAula, setListaAula] = useState([]);
    const [classeAcao, setClasseAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");
    const router = useRouter();
    
    const id = query.id;

    const estaLogado = usuarioService.estaAutenticadoAdm();
    
    useEffect(() => {
        moduloService.abrirAula(id).then((response) => setListaAula(response.data));
        setNome(listaAula.nome);
        setData(moment(listaAula.data).utc().format('DD/MM/Y'))
    }, [id, listaAula.data, listaAula.nome]);

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
        
        setClasseAcao('salvar');
        setMensagemAcao('Atualizado com sucesso!');
        setEstaSubmetendo(true);
        
        try{
            const dadosAula = ({
                nome: nome,
                data: data
            });
            
            await moduloService.editarAulas(id, dadosAula);
            
        } catch(error){
            alert(
                "Erro ao editar a aula. " + error?.response?.data?.erro
                );
            }
            
            setEstaSubmetendo(false);
        }
        
        const deletarAula = async (idModulo) => {
            
            setEstaSubmetendo(true);
            setClasseAcao('deletar');
            setMensagemAcao('Aula deletada com sucesso!');
            
            try{
                await moduloService.deletarAulas(idModulo);
                router.push('/');
                
            } catch(error){
                alert(
                    "Erro ao deletar a aula. " + error?.response?.data?.erro
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
                        texto="Nome da Aula"
                        tipo="text"
                        valor={nome}
                        aoAlterarValor={e => setNome(e.target.value)}
                        mensagemValidacao="O nome da aula precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                    
                    <InputPublico
                        texto="Descrição"
                        tipo="text"
                        valor={data}
                        aoAlterarValor={e => setData(e.target.value)}
                        mensagemValidacao="A data precisa possuir o dia, mês e ano no formato dd/mm/aaaa"
                        exibirMensagemValidacao={data && !validaData(data)}
                    />

                    <Botao
                        texto={"Salvar alterações"}
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>
                    <Botao 
                        texto={"Deletar aula?"}
                        cor="vermelho"
                        tipo="button"
                        manipularClique={() =>  deletarAula(id)}
                        desabilitado={estaSubmetendo}
                    />
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default comAutorizacao(EditarAula);