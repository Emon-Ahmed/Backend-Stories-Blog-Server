import express from "express";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blogsController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", protect, getBlog);
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
