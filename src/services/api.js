import axios from 'axios';

const api = axios.create({
    baseURL: window.servidor,
    headers: { 'Content-Type': 'application/json' },
})

export default api;