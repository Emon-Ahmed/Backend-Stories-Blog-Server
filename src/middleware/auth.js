import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Please Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token Format",
      });
    }

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication Failed",
    });
  }
};
