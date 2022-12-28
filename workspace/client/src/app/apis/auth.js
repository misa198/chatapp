import api from "./axios";

export const loginApi = (params) => api.post("/auth/login", params);
export const registerApi = (params) => api.post("/auth/register", params);
