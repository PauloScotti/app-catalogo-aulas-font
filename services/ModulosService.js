import HttpService from "./HttpService";

export default class ModulosService extends HttpService {
    
    async listarModulos() {
        return this.get('/modulos');
    }

    async abrirAulasModulos(id) {
        return this.get(`/pesquisarAulas?id=${id}`);
    }

    async abrirModulo(id) {
        return this.get(`/modulos?id=${id}`);
    }

    async abrirAula(aula) {
        return this.get(`/aula?id=${aula}`);
    }

    async editarModulos(id, dados) {
        return this.put(`/editarModulos?id=${id}`, dados);
    }

    async editarAulas(id, dados) {
        return this.put(`/editarAulas?id=${id}`, dados);
    }

    async cadastrarModulos(dados) {
        return this.post(`/cadastroModulos`, dados);
    }

    async cadastrarAulas(id, dados) {
        return this.post(`/cadastroAulas?id=${id}`, dados);
    }

    async deletarModulos(id) {
        return this.delete(`/deletarModulos?id=${id}`);
    }

    async deletarAulas(id) {
        return this.delete(`/deletarAulas?id=${id}`);
    }

}
