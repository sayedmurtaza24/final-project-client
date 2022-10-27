import { baseUrl } from "../config";
import httpClient from '../http';

const isDevelopment = process.env.NODE_ENV === "development";

const basePath = baseUrl + "/api/auth"
const bloc = {
  login: async id_token => {
    const res = await httpClient.post(`${basePath}/login?id_token=${id_token}`);
    if (isDevelopment) localStorage.setItem('token', res.token);
  },
  logout: () => {
    if (isDevelopment) localStorage.removeItem('token');
    return httpClient.post(`${basePath}/logout`);
  },
};

export default bloc;