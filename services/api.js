import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.NODE_ENV == 'development' ? process.env.FRONTEND_URL_DEV : process.env.FRONTEND_URL_VERCEL
});

api.defaults.withCredentials = true;

export default api;
