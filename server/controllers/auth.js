const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

exports.signupController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already registered",
      });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.json({
      successMessage: "Registration success. Please Login.",
    });
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials.",
      });
    }

    // prep payload
    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) {
        console.log("jwt error: ", err);
      }
      const { _id, username, email, role } = user;

      res.json({
        token,
        user: {
          _id,
          username,
          email,
          role,
        },
      });
    });
  } catch (err) {
    console.log("siginController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

exports.read = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await user.findById(userId);

    res.json(user);
  } catch (err) {
    console.log(err, "userController.read error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const users = await user.find({}).populate(
      "userCategory",
      "category"
    );

    res.json({ users });
  } catch (err) {
    console.log(err, "userController.readAll error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};