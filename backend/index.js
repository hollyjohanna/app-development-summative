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
const WildlifePost = require("./models/wildlife-post.js");
const User = require("./models/user.js");
const Comment = require("./models/comment.js");

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
    `mongodb+srv://${config.username}:${config.password}@sum3db.cx7l0zw.mongodb.net/Wētāverse?retryWrites=true&w=majority`
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

//===============================================================================
//                                  ADD METHOD
//===============================================================================

app.post(`/addWildlifePost`, (req, res) => {
  // create a new instance of the student schema
  const newWildlifePost = new WildlifePost({
    // give our new student the details we sent from the frontend
    _id: new mongoose.Types.ObjectId(),
    image_url: req.body.image_url,
    title: req.body.title,
    location: req.body.location,
    caption: req.body.caption,
  });
  // to save the newstudent to the database
  // use the variable declared above
  newWildlifePost
    .save()
    .then((result) => {
      console.log(`Added a new post successfully!`);
      // return back to the frontend what just happened
      res.send(result);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
});
// ==============================================================================
//                                 SIGN UP USERS
// ==============================================================================
app.post("/registerUser", (req, res) => {
  // Checking if user is in the DB already

  User.findOne({ username: req.body.username }, (err, userResult) => {
    if (userResult) {
      // send back a string so we can validate the user
      res.send("username exists");
    } else {
      const hash = bcrypt.hashSync(req.body.password); // Encrypt User Password
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hash,
        profile_img_url: req.body.profile_img_url,
      });

      user
        .save()
        .then((result) => {
          // Save to database and notify userResult
          res.send(result);
        })
        .catch((err) => res.send(err));
    } // Else
  });
}); // End of Create Account

// ==============================================================================
//                                  LOGIN
// ==============================================================================
app.post("/loginUser", (req, res) => {
  User.findOne({ username: req.body.username }, (err, userResult) => {
    if (userResult) {
      if (bcrypt.compareSync(req.body.password, userResult.password)) {
        res.send(userResult);
      } else {
        res.send("not authorised");
      } // inner if
    } else {
      res.send("user not found");
    } // outer if
  }); // Find one ends
}); // end of post login
