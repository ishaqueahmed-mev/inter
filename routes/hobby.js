var express = require('express');
var router = express.Router();
var Hobby = require('../models/hobby.model');
var mongoose = require('mongoose')

router.get('/', (req, res) => {
    Hobby.find((err, result) => {
        if(err) res.send(err)
        else res.status(200).send(result)
    })
})

module.exports = router;