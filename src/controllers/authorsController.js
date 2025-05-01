import userModel from "../models/userModel.js";
import blogsModel from "../models/blogsModel.js";

// Get all authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await userModel.find().select("name email blogs");
    res.json({
      success: true,
      data: authors,
      message: "Authors fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get single author with their blogs
export const getAuthorById = async (req, res) => {
  try {
    const author = await userModel.findById(req.params.id).select("name email");

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    const blogs = await blogsModel
      .find({ author: req.params.id })
      .populate("categories", "name")
      .select("name description imageUrl categories createdAt");

    res.json({
      success: true,
      data: {
        author,
        blogs,
      },
      message: "Author details fetched successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Invalid Author ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete author and optionally their blogs
export const deleteAuthor = async (req, res) => {
  try {
    const author = await userModel.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    // Optional: Delete all blogs by this author
    await blogsModel.deleteMany({ author: req.params.id });

    res.json({
      success: true,
      message: "Author and their blogs deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
