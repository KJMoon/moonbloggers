const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.post("/currentuser", usersController.getCurrentUser);

router.post("/postuser", usersController.getPostUser);

module.exports = router;
