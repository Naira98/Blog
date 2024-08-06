const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../config");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.date = errors.array();
    throw error;
  }
  const { email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: hashedPassword,
      posts: [],
    });
    const result = await user.save();
    return res
      .status(201)
      .json({ message: "User created", userId: result._id });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.date = errors.array();
    throw error;
  }
  const { email, password } = req.body;
  let userData;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Wrong email or password");
      error.statusCode = 401;
      error.date = errors.array();
      throw error;
    }
    userData = user;
    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      const error = new Error("Wrong email or password");
      error.statusCode = 401;
      error.date = errors.array();
      throw error;
    }
    const token = jwt.sign(
      { email, userId: userData._id.toString() },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ token });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.getStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    return res.status(200).json({ status: user.status });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
exports.postStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    user.status = newStatus;
    await user.save();
    return res.status(200).json({ message: "Status updated" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
