import express from "express";
import {
  changePassword,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// registration

router.route("/register").post(singleUpload, register);

// login
router.route("/login").post(login);

// logout
router.route("/logout").post(logout);

// get my profile

router.route("/me").get(isAuthenticated, getMyProfile);

// change password
router.route("/changepassword").put(isAuthenticated, changePassword);

// update profile

router.route("/updateprofile").put(isAuthenticated, updateProfile);

// update profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// forget password

router.route("/forgetpassword").post(forgetPassword);

// reset password

router.route("/resetpassword/:token").put(resetPassword);

// addtoplaylist

// router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// remove from playlist
// router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// delete my profile

router.route("/deletemyprofile").delete(isAuthenticated);

//admin routes
// get all users
router
  .route("/admin/users")
  .get(isAuthenticated, isAdminAuthenticated, getAllUsers);

// to make someone admin

router
  .route("/admin/user/:id")
  .put(isAuthenticated, isAdminAuthenticated, updateUserRole)
  .delete(isAuthenticated, deleteUser);

export default router;
