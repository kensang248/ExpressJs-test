var express = require("express");
var router = express.Router();
var controller = require('../controller/product.controller.js');

router.get("/",controller.index);
router.post("/",controller.create);
module.exports = router;