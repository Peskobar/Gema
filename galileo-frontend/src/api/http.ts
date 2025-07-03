import axios from 'axios';
// CM-21 s.33 opisuje adresację serwera sterowania

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  timeout: 5000
});

export default api;
