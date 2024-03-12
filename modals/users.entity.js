const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Contact = require("./contacts.entity");
const Spam = require("./spam.entity");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [10, 15] },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.hasMany(Contact);
User.hasMany(Spam, { as: "Spam", foreignKey: "reportedBy" });
module.exports = User;
