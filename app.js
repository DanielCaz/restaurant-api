const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
