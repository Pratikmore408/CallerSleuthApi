const Joi = require("joi");

exports.registerSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/))
    .required(),
  email: Joi.string().email().allow(null, ""),
  password: Joi.string().min(6).required(),
});

exports.loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
