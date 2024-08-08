import { User } from "../models/User.js";

export const sendToken = async (res, user, message, statusCode = 200) => {
  const isDevModeOn = process.env.NODE_ENV !== "production";

  const token = user.getJWTToken();

  // let oldTokens = user.tokens || [];

  // if (oldTokens.length) {
  //   oldTokens = oldTokens.filter((t) => {
  //     const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
  //     if (timeDiff < 86400) {
  //       return t;
  //     }
  //   });
  // }

  // await User.findByIdAndUpdate(user._id, {
  //   tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  // });

  const options = {
    // maxAge: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("jwtoken", token, options).json({
    success: true,
    message,
    user,
  });

  // res.status(statusCode).json({
  //   success: true,
  //   message,
  //   user,
  // });
};
