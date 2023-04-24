const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.get("/:id", postsController.getPost);

router.post("/createPost/", postsController.createPost);

router.patch("/editPost/:id", postsController.editPost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
