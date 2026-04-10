const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/carbon");

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User registered");
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.json(user);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
