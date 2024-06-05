import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorpayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

// buy subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

// payment verification and saving details in db for refund process
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

// get razorpay key 
router.route("/razorpaykey").get(getRazorpayKey);

// cancel subscription 
router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription);

export default router;
