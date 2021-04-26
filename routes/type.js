var express = require('express');
var router = express.Router();
var typeCtrl = require('../controllers/type.controller')

router.get('/', typeCtrl.find)
module.exports = router;