import axios from 'axios';

export const backend = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? process.env.BACKEND_URL_DEV : process.env.BACKEND_URL_HEROKU
});

backend.defaults.withCredentials = true;

export default backend;
