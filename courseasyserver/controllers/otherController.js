import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("Input fields cant be empty", 400));

  const to = process.env.MY_MAIL;

  const subject = "Contact from Courseasy";

  const text = `I am ${name} and my email is ${email}. \n${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Message has been sent.",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course)
    return next(new ErrorHandler("Input fields cant be empty", 400));

  const to = process.env.MY_MAIL;

  const subject = "Request for a course from TfpCoding";

  const text = `I am ${name} and my email is ${email}. \n${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Request has been sent.",
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);
  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }

  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
    });
  }

  const usersCount = statsData[11].users;

  let usersPercentage = 0;

  let usersProfit = true;

  if (statsData[10].users === 0) usersPercentage = usersCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
    };

    usersPercentage = (difference.users / statsData[10].users) * 100;

    if (usersPercentage < 0) {
      usersProfit = false;
    }
  }
  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    usersPercentage,
    usersProfit,
  });
});
