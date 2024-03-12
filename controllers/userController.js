const { Op } = require("sequelize");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const resError = require("../middleware/errors");
const User = require("../modals/users.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = catchAsyncErrors(async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  let user = await User.findOne({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (user) {
    return resError(
      {
        message: "User already exist",
        statusCode: 400,
      },
      res
    );
  }

  let hasedPassword = await bcrypt.hash(password, 12);

  user = await User.create({
    name,
    phoneNumber,
    email,
    password: hasedPassword,
  });

  res.status(200).json({
    message: "User registered successfully",
    success: true,
  });
});

exports.login = catchAsyncErrors(async (req, res) => {
  const { userName, password } = req.body;

  let user = await User.findOne({
    [Op.or]: [
      {
        phoneNumber: userName,
      },
      {
        name: userName,
      },
    ],
  });
  if (!user) {
    return resError(
      {
        message: "User not found",
        statusCode: 404,
      },
      res
    );
  }

  let isVerified = await bcrypt.compare(password, user.password);

  if (!isVerified) {
    return resError(
      {
        message: "Password is incorrect",
        statusCode: 403,
      },
      res
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_KEY || "jOBr1tTsBXlxQrrZhzp8NHyPorMOBaPO", {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    message: "User login successfully",
    success: true,
    token: token,
  });
});
