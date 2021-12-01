const serverless = require("serverless-http");
const express = require("express");

const auth = require("./app/middleware/auth");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const admin = require("firebase-admin");
require("dotenv").config();

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.urlServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/api/info", (req, res) => {
  res.send({ application: "sample-app", version: "1" });
});
app.post("/api/v1/getback", (req, res) => {
  res.send({ ...req.body });
});

app.get("/api/hello", (req, res) => {
  res.status(200).send("Hello 🙌");
});

app.post("/api/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌");
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/note.routes.js")(app);
require("./app/routes/notese.routes.js")(app);

//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);
