const resError = require("./errors");
module.exports = function (Schema) {
  return async function (req, res, next) {
    try {
      if (!req.body)
        return resError({ statusCode: 400, message: "Invalid data" }, res);
      const validated = await Schema.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi)
        return resError(
          { statusCode: 400, message: { msg: err.message.replace(/"/g, "") } },
          res
        );
    }
  };
};
