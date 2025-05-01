import blogsModel from "../models/blogsModel.js";
import userModel from "../models/userModel.js";
import categoriesModel from "../models/categoriesModel.js";
import { uploadToCloudinary } from "../services/cloudinaryService.js";

// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogsModel
      .find()
      .populate("categories", "name")
      .populate("author", "name email");

    res.json({
      success: true,
      data: blogs,
      message: "Blogs Fetched",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Create Blog
export const createBlog = async (req, res) => {
  const { name, description, categoryId } = req.body;
  const authorId = req.user.id;

  try {
    let image = "";
    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer);
    }

    // Check if categoryId is valid
    const category = await categoriesModel.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const blog = new blogsModel({
      name,
      description,
      imageUrl: image.url,
      author: authorId,
      categories: categoryId,
    });

    await blog.save();

    // Update the user's document with the new blog ID
    await userModel.findByIdAndUpdate(
      authorId,
      { $push: { blogs: blog._id } },
      { new: true }
    );

    // Update Category's `blogs` array
    await categoriesModel.findByIdAndUpdate(
      categoryId,
      { $push: { blogs: blog._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: blog,
      message: "Blog Created",
    });
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({
      success: false,
      message: "Blog Server Error",
    });
  }
};

// Get single book
export const getBlog = async (req, res) => {
  try {
    const blog = await blogsModel
      .findById(req.params.id)
      .populate("categories", "name")
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    res.json({
      success: true,
      data: blog,
      message: "Blog retrieved successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update book
export const updateBlog = async (req, res) => {
  const { name, description } = req.body;

  try {
    let updateFields = {
      name,
      description,
    };

    const blog = await blogsModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    res.json({
      success: true,
      data: blog,
      message: "Blog updated successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete book
export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogsModel.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    res.json({
      success: true,
      data: {},
      message: "Blog deleted successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
