import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  deleteAuthor,
} from "./../controllers/authorsController.js";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.delete("/:id", deleteAuthor);

export default router;
