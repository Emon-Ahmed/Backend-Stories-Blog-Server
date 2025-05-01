import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import "./config/cloudinary.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import authorsRoutes from "./routes/authorsRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/authors", authorsRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
