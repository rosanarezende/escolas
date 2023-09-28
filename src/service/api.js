import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5135/api',
});

export { api }