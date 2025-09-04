import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

// Get contact info
export const fetchContactInfo = () => API.get("/contact-info");

// Update contact info (Admin only)
export const updateContactInfo = (data) => API.put("/contact-info", data);
