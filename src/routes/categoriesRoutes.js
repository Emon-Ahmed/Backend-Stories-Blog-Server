import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createCategories,
  deleteCategories,
  getAllCategories,
  getCategories,
  updateCategories,
} from "../controllers/categoriesController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategories);
router.post("/", protect, createCategories);
router.put("/:id", protect, updateCategories);
router.delete("/:id", protect, deleteCategories);

export default router;
