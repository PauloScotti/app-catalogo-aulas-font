import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {
    async login(credenciais) {
        const {data} = await this.post('/login', credenciais);
        console.log(data);
        
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        
        if(data.token){
            localStorage.setItem("token", data.token);
        }
        
        if(data.tokenAdm){
            localStorage.setItem("tokenAdm", data.tokenAdm);
        }

        const usuario = await this.get('/usuario');
        localStorage.setItem('id', usuario.data._id);

        if(usuario.data.avatar){
            localStorage.setItem("avatar", usuario.data.avatar);
        }
    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenAdm');
        localStorage.removeItem('nome');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
    }

    async cadastroUsuarios(dados) {
        return this.post('/cadastroUsuarios', dados);
    }

    estaAutenticado() {
        return localStorage.getItem('token');
    }

    estaAutenticadoAdm() {
        return localStorage.getItem('tokenAdm');
    }
}