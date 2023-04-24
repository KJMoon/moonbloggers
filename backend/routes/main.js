const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.get("/api/feed", postsController.getPosts);

router.get("/api/profile/:username", postsController.getProfile);

router.get("/api/random", postsController.getRandomPost);

router.post("/api/user", postsController.getUser);

module.exports = router;
