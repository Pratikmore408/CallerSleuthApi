require("dotenv").config({
  path: ".env",
});
const app = require("./app");
const http = require("http");
const { connectDb } = require("./config/database");

connectDb();
let servers = http.Server(app);

servers.listen(process.env.PORT || 6000, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} environment`
  );

  process.on("unhandledRejection", (err) => {
    console.log(`ERROR`, err);
  });
});
