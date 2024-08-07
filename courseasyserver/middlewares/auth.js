import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { jwtoken } = req.cookies;

  if (!jwtoken) return next(new ErrorHandler("Please Login First", 401));

  const decoded = jwt.verify(jwtoken, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});

// export const isAuthenticated = catchAsyncError(async (req, res, next) => {
//   if (req.headers && req.headers.authorization) {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log("token", token);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded._id);
//     next();
//   } else {
//     return next(new ErrorHandler("Please Login First", 401));
//   }
// });

export const isAdminAuthenticated = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  next();
};
