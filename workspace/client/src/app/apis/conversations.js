import api from "./axios";

export const listConversationsApi = () => api.get("/conversations");

export const listMessagesApi = (conversationId) =>
  api.get(`/conversations/${conversationId}`);
