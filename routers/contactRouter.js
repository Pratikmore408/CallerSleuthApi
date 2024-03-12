const express = require("express");
const {
  reportSpam,
  searchByName,
  getContactDetails,
  searchByPhoneNumber,
  addContacts,
} = require("../controllers/contactController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
const validator = require("../middleware/validator");
const {
  reportSpamValidator,
  contactAddValidator,
} = require("../validator/contactValidator");

router.get("/search/name/:keyword", isAuthenticatedUser, searchByName);
router.get(
  "/search/phone/:phoneNumber",
  isAuthenticatedUser,
  searchByPhoneNumber
);
router.get("/detail/:id", isAuthenticatedUser, getContactDetails);

router.post(
  "/reportSpam",
  isAuthenticatedUser,
  validator(reportSpamValidator),
  reportSpam
);

router.post(
  "/add",
  isAuthenticatedUser,
  validator(contactAddValidator),
  addContacts
);

module.exports = router;
