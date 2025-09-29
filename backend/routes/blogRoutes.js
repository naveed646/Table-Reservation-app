const express = require("express");
const router = express.Router();
const blogController = require ("../controller/blogController")
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // temp folder for file uploads

router.post( "/", upload.single("image"), blogController.createBlog )

router.get("/", blogController.getBlogs)

router.get("/:id", blogController.getBlogById)

router.put("/:id", upload.single("image"), blogController.updateBlog)

router.delete("/:id", blogController.deleteBlog)

module.exports = router;