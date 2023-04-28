const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likes");

router.post("/likescount", likesController.getLikes);

router.post("/addlike", likesController.addLike);

router.delete("/deletelike", likesController.deleteLike);

module.exports = router;
