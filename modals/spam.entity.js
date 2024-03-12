const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Spam = sequelize.define("Spam", {
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [10, 15] },
  },
});

module.exports = Spam;
