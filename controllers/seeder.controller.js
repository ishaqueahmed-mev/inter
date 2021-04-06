var mongoose = require('mongoose');
var Hobby = require('../models/hobby.model');
var Type = require('../models/type.model');

var typeData = [
    {
        "name": "WFH"
    },
    {
        "name": "office workplace"
    }
]

var hobbyData = [
    {
        "name": "Java learning"
    },
    {
        "name": "CakePHP learning"
    },
    {
        "name": "Angular learning"
    },
    {
        "name": "Node learning"
    }
]

exports.addData = () => {
    Hobby.find((err, result) => {
        if (err) throw err;
        if (result && result.length == 0) {
            Hobby.insertMany(hobbyData)
        }
    })

    Type.find((err, result) => {
        if (err) throw err;
        if (result && result.length == 0) {
            Type.insertMany(typeData)
        }
    })
}