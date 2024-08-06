const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const feedControllers = require("../controllers/feed");
const isAuth = require("../middlewares/is-auth");

router.get("/posts", isAuth, feedControllers.getPosts);

router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedControllers.postPost
);

// GET /feed/post/postId
router.get("/post/:postId", isAuth, feedControllers.getPost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedControllers.updatePost
);

router.delete("/post/:postId", isAuth, feedControllers.deletePost);

module.exports = router;
