const Joi = require("joi");

exports.reportSpamValidator = Joi.object({
  phoneNumber: Joi.string()
    .required()
    .pattern(new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/))
    .message("Invalid phone number format"),
});

exports.contactAddValidator = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string()
    .required()
    .pattern(new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/))
    .message("Invalid phone number format"),
});
