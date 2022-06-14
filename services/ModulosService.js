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

    async editarModulos() {
        return this.put(`/editarModulos?id=${id}`);
    }

    async editarAulas() {
        return this.put(`/editarAulas?id=${id}`);
    }

    async cadastrarModulos() {
        return this.post(`/cadastrarModulos?`);
    }

    async cadastrarAulas() {
        return this.post(`/cadastrarAulas?`);
    }

    async deletarModulos() {
        return this.delete(`/deletarModulos?id=${id}`);
    }

    async deletarAulas() {
        return this.delete(`/deletarAulas?id=${id}`);
    }

}
