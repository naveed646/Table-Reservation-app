import axios from "axios"

const API= axios.create({
   baseURL: "http://localhost:8000/api/blogs",
});

export const createBlog = async (formData)=>{
    try{
        const res =  await API.post("/", formData, {
        headers: {"Content-Type": "multipart/form-data"}
    });
    
    return res.data
    
    }
    catch(err){
        throw err.response?.data || { message: "Blog creation failed" };
    }
};

export const getAllBlogs = async ({ search = "", page = 1, limit = 5 } = {}) => {
  try {
    const res = await API.get("/", { params: { search, page, limit } });
    return res.data; 
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch blogs" };
  }
};



export const getBlog = async (page = 1, limit = 3) => {
  try {
    const res = await API.get(`/`, { params: { page, limit } });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch blogs" };
  }
};


export const getBlogById = async (id) => {
  try {
    const res = await API.get(`/${id}`); 
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch blog" };
  }
};


export const updateBlog = async (id, formData) => {
  try {
    const res = await API.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Blog update failed" };
  }
};

export const deleteBlog = async (id) => {
  try {
    const res = await API.delete(`/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Blog deletion failed" };
  }
};

export default API;