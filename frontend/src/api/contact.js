import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Send new contact message
export const sendContactMessage = (data) => API.post("/contact", data);

// Fetch all messages (admin)
export const fetchContactMessages = () => API.get("/contact");
