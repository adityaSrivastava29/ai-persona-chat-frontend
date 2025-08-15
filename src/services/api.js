// services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5003/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const personaAPI = {
  getAll: () => api.get("/personas"),
  getChatHistory: (personaId) => api.get(`/chat-history/${personaId}`),
  chatWithHardcodedPersona: (personaKey, message) =>
    api.post(`/chat/${personaKey}`, { message }),
  chatWithCustomPersona: (systemPrompt, message, personaName) =>
    api.post("/custom-chat", { systemPrompt, message, personaName }),
  // New API for continuing chat with existing custom persona
  continueCustomPersonaChat: (personaId, systemPrompt, message) =>
    api.post("/custom-persona-chat", { personaId, systemPrompt, message }),
};

export default api;
