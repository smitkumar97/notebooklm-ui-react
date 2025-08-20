import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5000",
  //   baseURL = "https://notebooklm-server.onrender.com/api";
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle blacklisted/expired token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const navigate = useNavigate();
    if (err.response?.status === 401) {
      navigate("/login");
    }
    return Promise.reject(err);
  }
);

export default api;
