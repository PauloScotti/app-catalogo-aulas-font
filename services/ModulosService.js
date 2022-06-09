import HttpService from "./HttpService";

export default class ModulosService extends HttpService {
    
    async listarModulos() {
        return this.get('/modulos');
    }

    async abrirModulos() {
        return this.get(`/modulos?id=${id}`);
    }

}
