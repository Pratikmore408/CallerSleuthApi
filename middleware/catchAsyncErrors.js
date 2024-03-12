const resError = require("./errors");

module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch((error) => {
    return resError(
      {
        message: error?.message,
        statusCode: 500 || error?.statusCode,
      },
      res
    );
  });
