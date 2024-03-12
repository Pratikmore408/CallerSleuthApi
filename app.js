const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routers/index");

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", routes);

module.exports = app;
