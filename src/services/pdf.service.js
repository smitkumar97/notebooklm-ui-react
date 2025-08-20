import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/note";
// const API_BASE_URL = "https://notebooklm-server.onrender.com/api";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const response = await axios.post(`${API_BASE_URL}/uploadfile`, formData);
  return response;
};

export const getPdfUrl = async (docId) => {
  const response = await axios.get(`${API_BASE_URL}/documents/${docId}`);
  return response;
};

export const suggestedQuestionsService = async (docId) => {
  const response = await axios.get(`${API_BASE_URL}/questions/${docId}`);
  return response;
};

export const askQuestion = async (docId, question) => {
  const response = await axios.post(`${API_BASE_URL}/ask`, {
    documentId: docId,
    question: question,
  });
  return response;
};

export const getChatHistory = async (docId) => {
  const response = await axios.get(`${API_BASE_URL}/chat/${docId}`);
  return response;
};

export const getAllDocuments = async () => {
  const response = await axios.get(`${API_BASE_URL}/documents`);
  return response;
};
