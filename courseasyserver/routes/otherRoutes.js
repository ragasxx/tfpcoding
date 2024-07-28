import express from "express";
import {
  contact,
  courseRequest,
  getDashboardStats,
} from "../controllers/otherController.js";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// contact form

router.route("/contact").post(contact);

// reques form
router.route("/courserequest").post(courseRequest);

// admin dashboard stats

router
  .route("/admin/stats")
  .get(isAuthenticated, isAdminAuthenticated, getDashboardStats);

export default router;
