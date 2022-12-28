import api from "./axios";

export const loginApi = (params) => api.post("/auth/login", params);
