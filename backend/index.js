// ==============================================================================
//                                  DEPENDENCIES
// ==============================================================================
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("./config.json");

// -------------------------------------Schemas-----------------------------------
const wildlife_post = require("./models/wildlife-post.js");
const user = require("./models/user.js");
const comments = require("./models/comments.js");

// ----------------------------------Start Dependencies---------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// -----------------------------------Start Server--------------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ---------------------------------Connect to MongoDB----------------------------
mongoose
  .connect(
    `mongodb+srv://${config.username}:${config.password}@sum3db.cx7l0zw.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`You've connected to MongoDB!`);
  })
  .catch((err) => {
    console.log(`DB connection error ${err.message}`);
  });

// ==============================================================================
//                                  GET METHOD
// ==============================================================================
app.get("/allWildlifePosts", (req, res) => {
  WildlifePost.find().then((result) => {
    res.send(result);
  });
});
