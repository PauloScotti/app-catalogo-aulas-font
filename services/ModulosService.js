import HttpService from "./HttpService";

export default class ModulosService extends HttpService {
    
    async listarModulos() {
        return this.get('/modulos');
    }

    async abrirModulos(id) {
        return this.get(`/pesquisarAulas?id=${id}`);
    }
    async abrirAula(aula) {
        return this.get(`/aula?id=${aula}`);
    }

    async editarModulos(dados) {
        return this.put(`/editarModulos`, dados);
    }

    async editarAulas(dados) {
        return this.put(`/editarAulas`, dados);
    }

    async cadastrarModulos(dados) {
        return this.post(`/cadastroModulos`, dados);
    }

    async cadastrarAulas(dados) {
        return this.post(`/cadastrarAulas`, dados);
    }

    async deletarModulos() {
        return this.delete(`/deletarModulos?id=${id}`);
    }

    async deletarAulas() {
        return this.delete(`/deletarAulas?id=${id}`);
    }

}
