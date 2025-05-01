import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please Enter a Valid Email"],
    },
    password: {
      type: String,
      require: true,
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

const userModel = mongoose.models.users || mongoose.model("Users", userSchema);

export default userModel;
