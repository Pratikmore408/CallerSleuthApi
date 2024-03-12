const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Contact = sequelize.define("Contact", {
  name: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [10, 15] },
  },
});

module.exports = Contact;
