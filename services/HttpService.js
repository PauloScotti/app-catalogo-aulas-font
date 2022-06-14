import axios from "axios";

export default class HttpService {
    constructor() {
        const URL = process.env.NEXT_PUBLIC_API_URL+'/api/';
        this.axios = axios.create({
            baseURL: URL
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

    get(url, data) {
        return this.axios.get(url, data);
    }
}