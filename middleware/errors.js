module.exports = (err, res) => {
  return res.status(err.statusCode).json({
    success: false,
    error: {
      message: err.message,
    },
  });
};
