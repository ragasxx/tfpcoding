export const catchAsyncError = (passedfunction) => (req, res, next) => {
  Promise.resolve(passedfunction(req, res, next)).catch(next);
};

// if we dont have any handler for next rather than error middleware then its going to call error middleware 