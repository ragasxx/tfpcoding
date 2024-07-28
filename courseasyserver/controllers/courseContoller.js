import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import { Stats } from "../models/Stats.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const courses = await Course.find({
    title: {
      $regex: keyword,
    },
    category: {
      $regex: category,
    },
  }).select("-lectures");

  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, createdBy, category } = req.body;

  if (!title || !description || !createdBy || !category)
    return next(new ErrorHandler("Please add all fields", 400));

  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    description,
    createdBy,
    category,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully.You can add lectures now",
  });
});

// get course details

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) return next(new ErrorHandler("Course doesn't exist", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

export const addLecture = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;

  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course doesn't exist", 404));

  // upload file from cloudinary

  course.lectures.push({
    title,
    description,
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "lecture added in course",
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course doesn't exist", 404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  // for (let i = 0; i < course.lectures.length; i++) {
  //   const singleLecture = course.lectures[i];
  //   await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
  //     resource_type: "video",
  //   });
  // }
  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById(courseId);

  if (!course) return next(new ErrorHandler("Course doesn't exist", 404));

  const lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });

  // await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
  //   resource_type: "video",
  // });

  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture Deleted Successfully",
  });
});

// Course.watch().on("change", async () => {
//   const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

//   const courses = await Course.find({});

//   let totalViews = 0;

//   for (let i = 0; i < courses.length; i++) {
//     totalViews += courses[i].views;
//   }
//   stats[0].views = totalViews;
//   stats[0].createdAt = new Date(Date.now());
//   await stats[0].save();
// });
