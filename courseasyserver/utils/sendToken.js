export const sendToken = (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();
  const options = {
    // maxAge: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("jwtoken", token, options).json({
    success: true,
    message,
    user,
  });
};
