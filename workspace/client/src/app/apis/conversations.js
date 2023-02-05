import api from "./axios";

export const listConversationsApi = () => api.get("/conversations");

export const listMessagesApi = (conversationId) =>
  api.get(`/conversations/${conversationId}`);

export const sendMessageApi = (conversationId, message) =>
  api.post(`/conversations/${conversationId}`, message);
