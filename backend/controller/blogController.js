const Blog = require("../models/Blog");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../config/cloudinary");

exports.createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file);

    if (!uploadResult.success) {
      return res.status(500).json({ message: uploadResult.message });
    }

    const blog = new Blog({
      title,
      content,
      author,
      imageUrl: uploadResult.url,
      imagePublicId: uploadResult.public_id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3; // blogs per page
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments();

    res.json({
      blogs,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    let blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // If a new image is uploaded
    if (req.file) {
      // Delete old image if exists
      if (blog.imagePublicId) {
        await deleteFromCloudinary(blog.imagePublicId);
      }

      const uploadResult = await uploadToCloudinary(req.file);

      if (!uploadResult.success) {
        return res.status(500).json({ message: uploadResult.message });
      }

      blog.imageUrl = uploadResult.url;
      blog.imagePublicId = uploadResult.public_id;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ message: "Server error while updating blog" });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Delete image from Cloudinary
    if (blog.imagePublicId) {
      await deleteFromCloudinary(blog.imagePublicId);
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};