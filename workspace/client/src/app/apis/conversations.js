import api from "./axios";

export const listConversationsApi = () => api.get("/conversations");

export const listMessagesApi = (conversationId) =>
  api.get(`/conversations/${conversationId}`);

export const sendMessageApi = (conversationId, message) =>
  api.post(`/conversations/${conversationId}`, message);

export const sendMessageWithFileApi = (conversationId, formData) => {
  console.log(formData.get("file"));
  api.post(`/conversations/${conversationId}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
