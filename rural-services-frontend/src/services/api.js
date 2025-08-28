// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getServices = () => api.get("/services").then((res) => res.data);
export const getProducts = () => api.get("/products").then((res) => res.data);
export const getNews = () => api.get("/news").then((res) => res.data);
export const submitContactForm = (data) => api.post("/contact", data);
export const registerUser = (userData) => api.post("/register", userData);
export const loginUser = (credentials) => api.post("/login", credentials);
export const getUserProfile = () => api.get("/profile").then((res) => res.data);
export const updateUserProfile = (userData) => api.put("/profile", userData);
export const addToCart = (productId, quantity) =>
  api.post("/cart", { productId, quantity });
export const getCart = () => api.get("/cart").then((res) => res.data);

export default api;
