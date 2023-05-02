const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const postsController = require("../controllers/posts");

router.post("/", usersController.signedIn);

router.get("/api/feed", postsController.getPosts);

router.get("/api/profile/:username", postsController.getProfile);

router.get("/api/random", postsController.getRandomPost);

module.exports = router;
