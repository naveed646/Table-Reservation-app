import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/reservations",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ---------------- USER ----------------
export const createReservation = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};

export const getMyReservations = async () => {
  const res = await API.get("/my");
  return res.data;
};

export const updateReservation = async (id, data) => {
  const res = await API.put(`/${id}`, data); // { guests, duration }
  return res.data;
};

// reservation.js
export const cancelReservation = async (id) => {
  return await API.delete(`/${id}`, { status: "cancelled" });
};



// ---------------- ADMIN ----------------
export const getAllReservations = async () => {
  const res = await API.get("/");
  return res.data;
};

export const updateReservationStatus = async (id, status) => {
  const res = await API.put(`/${id}/status`, { status });
  return res.data;
};
