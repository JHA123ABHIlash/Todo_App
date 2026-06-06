import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI || "http://localhost:4002";

const api = axios.create({
  baseURL: BASE_URI,
  withCredentials: true,
});

export { BASE_URI };
export default api;
