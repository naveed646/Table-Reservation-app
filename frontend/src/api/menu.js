import axios from "axios";

const MENU_API = axios.create({
  baseURL: "http://localhost:8000/api/menu", 
});

// Get all menu items
export const getMenu = async (page = 1, limit = 5, search = "") => {
  const res = await MENU_API.get("/", {
    params: { page, limit, search }, 
  });
  return res.data; // returns { items, total, page, pages }
};

// Add new menu item
export const addMenu = async (formData) => {
  const res = await MENU_API.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete menu item
export const deleteMenu = async (id) => {
  const res = await MENU_API.delete(`/${id}`);
  return res.data;
};

// Update menu item (optional)
export const updateMenu = async (id, formData) => {
  const res = await MENU_API.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
