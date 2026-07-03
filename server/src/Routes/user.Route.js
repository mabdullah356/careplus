const express = require("express");
const { signup } = require("../Controllers/user.Controller");

const router = express.Router();


router.post("/",signup);


module.exports = router;