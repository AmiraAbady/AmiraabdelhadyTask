const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const User = require("../models/user");
const router = express.Router();
 
///Registration

router.post("/userSignup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch( () => {
        res.status(500).json({
          message: 'Email Already Exist'
        });
      });
  });
});

/// logIn

router.post("/userLogin", (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Email is incorrect"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Error password ,Please type it again"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token 
      });
    })
    .catch( ()=> {
      return res.status(401).json({
        message: "Invalid email or Password"
      });
    });
});





module.exports = router;