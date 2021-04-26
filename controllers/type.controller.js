var Type = require('../models/type.model');
var mongoose = require('mongoose');
var commonCtrl = require("../controllers/common.controller");

exports.find = async (req, res) => {
    try {
        let data = await commonCtrl.getData(Type);
        if(data) res.send({ data: data });
    } catch (err) {
        res.status(500).send(err)
    }

}