var express = require('express');
var router = express.Router();
var Type = require('../models/type.model');
var mongoose = require('mongoose')

router.get('/', (req, res) => {
    Type.find((err, result) => {
        if(err) res.send(err)
        else res.status(200).send(result)
    })
})

module.exports = router;