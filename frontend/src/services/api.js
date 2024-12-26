import axios from "axios";

// Criando uma conexão com meu servidor.
const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000, //Tempo limite para requisição
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api;