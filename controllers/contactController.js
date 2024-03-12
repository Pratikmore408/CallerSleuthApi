const { Op } = require("sequelize");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Contact = require("../modals/contacts.entity");
const Spam = require("../modals/spam.entity");
const User = require("../modals/users.entity");
const resError = require("../middleware/errors");
const { sequelize } = require("../config/database");

exports.reportSpam = catchAsyncErrors(async (req, res) => {
  const { phoneNumber } = req.body;
  await Spam.create({ reportedBy: req.user.id, phoneNumber });
  res.status(200).json({
    message: `${phoneNumber} reported as a spam`,
    success: true,
  });
});

exports.searchByName = catchAsyncErrors(async (req, res) => {
  const keyword = req.params.keyword.toLowerCase();
  const users = await User.findAll({
    attributes: ["name", "phoneNumber", "id"],
    where: {
      name: {
        [Op.or]: [{ [Op.startsWith]: keyword }, { [Op.substring]: keyword }],
      },
    },
    include: [{ model: Spam, as: "Spam" }],
    order: [
      [
        sequelize.literal(
          `CASE WHEN User.name LIKE '${keyword}%' THEN 1 ELSE 2 END`
        ),
        "ASC",
      ],
    ],
  });

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.searchByPhoneNumber = catchAsyncErrors(async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  let users = await User.findAll({
    where: {
      phoneNumber: phoneNumber,
    },
    attributes: ["name", "phoneNumber", "id"],
    include: [{ model: Spam, as: "Spam" }],
  });

  if (users.length == 0) {
    users = await Contact.findAll({
      where: {
        phoneNumber: phoneNumber,
      },
    });
  }

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getContactDetails = catchAsyncErrors(async (req, res) => {
  const userId = req.params.id;
  const searchingUserId = req.user.id;

  const user = await User.findOne({
    where: {
      id: userId,
    },
    include: [{ model: Contact }, { model: Spam, as: "Spam" }],
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

  const isContact = user.Contacts.some(
    (contact) => contact.UserId === searchingUserId
  );

  if (user.email && isContact) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      contacts: user.Contacts,
      spam: user.Spam,
    });
  } else {
    res.status(200).json({
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      contacts: user.Contacts,
      spam: user.Spam,
    });
  }
});

exports.addContacts = catchAsyncErrors(async (req, res) => {
  const { id } = req.user;
  const { name, phoneNumber } = req.body;

  await Contact.create({
    name: name,
    phoneNumber: phoneNumber,
    UserId: id,
  });

  return res.status(201).json({
    message: "Contact created successfully",
    success: true,
  });
});
