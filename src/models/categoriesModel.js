import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const categoriesModel = mongoose.model("Categories", categoriesSchema);
export default categoriesModel;
