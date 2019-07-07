var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({
  dest: "./public/images"
});


var controller = require("../controllers/user.controller.js");
var validation = require("../validation/user.validate.js");
var authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware.requiredAuth, controller.index);

router.get("/search", controller.search);
router.get("/create", controller.getCreate);

router.post(
  "/create",
  upload.single("avatar"),
  validation.postCreate,
  controller.postCreate
);
router.get("/view/:id", controller.getView);

module.exports = router;
