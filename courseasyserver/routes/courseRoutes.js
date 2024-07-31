import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseContoller.js";
import singleUpload from "../middlewares/multer.js";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course only admin
router
  .route("/createcourse")
  .post(isAuthenticated, isAdminAuthenticated, singleUpload, createCourse);

//add lectures,delete course,get course details
router
  .route("/course/:id")
  .get(getCourseLectures)
  .post(isAuthenticated, isAdminAuthenticated, singleUpload, addLecture)
  .delete(isAuthenticated, isAdminAuthenticated, deleteCourse);

// delete lectures lectures

router
  .route("/lecture")
  .delete(isAuthenticated, isAdminAuthenticated, deleteLecture);

export default router;
