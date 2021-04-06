var mongoose = require('mongoose');
var User = require('../models/user.model');
var Hobby = require('../models/hobby.model');
var Type = require('../models/type.model');
var path = require('path')
const fs = require('fs-extra');
const filepath = 'public/uploads/';

exports.create = (req, res) => {
    const file = req.file;
    req.body.profile = req.file.filename
    var user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            fs.unlink(path.join(req.file.path))
            res.send(err)
        }
        else res.send('Successfully added user')
    })
}

exports.getUsers = (req, res) => {
    User.find()
        .populate('hobbies')
        .populate('type')
        .exec((err, result) => {
            console.log(result)
            if (err) throw err;
            else res.send(result)
        })
}

exports.getUserById = (req, res) => {
    let id = req.params.id;
    User.findById({ _id: id })
        .populate('hobbies')
        .populate('type')
        .exec((err, result) => {
            if (err) throw err;
            else res.send(result)
        })
}

exports.deleteUser = (req, res) => {
    let id = req.params.id;
    User.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err) throw err;
        else {
            if (result) {
                const file = result.profile;
                fs.unlink(path.join(filepath + file));
                res.send('Sucessfully deleted')
            } else {
                res.send('Does not exists')
            }
        }
    })
}

exports.updateUser = (req, res) => {
    let id = req.params.id;
    let profile = req.file.filename
    let data = {...req.body, profile};
    User.findByIdAndUpdate({ _id: id }, data, (err, result) => {
        if (err) throw err;
        else {
            if (result) {
                const file = result.profile;
                fs.unlink(path.join(filepath + file));
                res.send(result)
            } else {
                res.send('Does not exists')
            }
        }
    })
}