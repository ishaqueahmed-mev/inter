var Hobby = require('../models/hobby.model');
var mongoose = require('mongoose');
var commonCtrl = require("../controllers/common.controller");

exports.find = async (req, res) => {
    try {
        let data = await commonCtrl.getData(Hobby);
        if (data) res.send({ data: data });
    } catch (err) {
        res.status(500).send(err)
    }

}