var express = require('express');
var router = express.Router();
var hobbyCtrl = require('../controllers/hobby.controller')

router.get('/', hobbyCtrl.find)
// router.get('/', (req, res) => {
//     Hobby.find((err, result) => {
//         if(err) res.send(err)
//         else res.status(200).send(result)
//     })
// })

module.exports = router;