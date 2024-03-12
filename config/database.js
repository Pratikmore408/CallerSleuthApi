const { Sequelize } = require("sequelize");

// please change the below credential 
exports.sequelize = new Sequelize(
  process.env.DATABASE_NAME || "instahyre",
  process.env.DATABASE_USER || "root",
  process.env.DATABASE_PASSWORD || "143143@Pm",
  {
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "mysql",
  }
);

exports.connectDb = async () => {
  try {
    await this.sequelize.sync();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error in database:", error);
  }
};
