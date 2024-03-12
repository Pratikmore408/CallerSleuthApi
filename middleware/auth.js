const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const resError = require("./errors");
const User = require("../modals/users.entity");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return resError("User is not login", res);
  }

  const token = authorization.split("Bearer ")[1];

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_KEY || "jOBr1tTsBXlxQrrZhzp8NHyPorMOBaPO");

    req.user = await User.findOne({ id: decoded.id });

    if (!req.user) {
      return resError("User is not login", res);
    }

    next();
  }
});
