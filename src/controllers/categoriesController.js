import Categories from "./../models/categoriesModel.js";
import Blogs from "./../models/blogsModel.js";

// Get all libraries
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    res.json({
      success: true,
      data: categories,
      message: "Categories retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get single library
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.findById(req.params.id).populate({
      path: "blogs",
      populate: [
        { path: "author", select: "name" },
        { path: "categories", select: "name" },
      ],
    });
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }

    res.json({
      success: true,
      data: categories,
      message: "Categories retrieved successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Create library
export const createCategories = async (req, res) => {
  const { name } = req.body;

  try {
    const categories = new Categories({
      name,
    });

    await categories.save();

    res.status(201).json({
      success: true,
      data: categories,
      message: "Categories created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update library
export const updateCategories = async (req, res, next) => {
  const { name } = req.body;

  try {
    const categories = await Categories.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }

    res.json({
      success: true,
      data: categories,
      message: "Categories updated successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete library
export const deleteCategories = async (req, res, next) => {
  try {
    const categories = await Categories.findByIdAndDelete(req.params.id);

    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }

    await Blogs.deleteMany({ categories: req.params.id });

    res.json({
      success: true,
      data: {},
      message: "Categories deleted successfully",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
