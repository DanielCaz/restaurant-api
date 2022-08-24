const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const usersRoute = require("./routes/users");
app.use("/users", usersRoute);
const tablesRoute = require("./routes/tables");
app.use("/tables", tablesRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
  },
  () => console.log("Connected to DB")
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
