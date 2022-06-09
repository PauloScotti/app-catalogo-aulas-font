import axios from "axios";

export default class HttpService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://localhost:3001/api'
        });

        this.axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if(token){
                config.headers.Authorization = 'Bearer ' + token
            }
            
            const tokenAdm = localStorage.getItem('tokenAdm');
            if(tokenAdm){
                config.headers.Authorization = 'Bearer ' + tokenAdm
            }

            return config;
        });
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    get(url) {
        return this.axios.get(url);
    }
}