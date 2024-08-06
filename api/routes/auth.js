const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const User = require("../models/user");
const authControllers = require("../controllers/auth");
const isAuth = require("../middlewares/is-auth");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .trim()
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDocs) => {
          if (userDocs) {
            return Promise.reject("Email already exists");
          }
        });
      }),
    body("password").trim().not().isEmpty().isLength({ min: 5 }),
    body("name").trim().not().isEmpty().isLength({ min: 3 }),
  ],
  authControllers.signup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .trim()
      .normalizeEmail(),
    body("password").trim().not().isEmpty().isLength({ min: 5 }),
  ],
  authControllers.login
);

router.get("/getStatus", isAuth, authControllers.getStatus);
router.patch(
  "/postStatus",
  [body("status").trim().not().isEmpty()],
  isAuth,
  authControllers.postStatus
);
module.exports = router;
