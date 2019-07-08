var express = require('express');
var router = express.Router();
var controller = require('../controllers/transfer.controller.js');

router.get('/create',controller.create);
router.post('/create',controller.postCreate);

module.exports = router;
