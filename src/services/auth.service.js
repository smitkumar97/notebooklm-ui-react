import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";
// const API_BASE_URL = "https://notebooklm-server.onrender.com/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });

  return response;
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/register`, {
    name,
    email,
    password,
  });

  return response;
};

export const logout = async () => {
  const response = await axios.post(`${API_BASE_URL}/logout`);
  return response;
};

export const signInWithGoole = async (code) => {
  const response = await axios.post(`${API_BASE_URL}/google`, {
    code: code,
  });
  return response;
};
