var mongoose = require('mongoose');
var User = require('../models/user.model');
var Hobby = require('../models/hobby.model');
var Type = require('../models/type.model');
var path = require('path')
const fs = require('fs-extra');
const filepath = 'public/uploads/';

exports.create = (req, res) => {
    const file = req.file;
    req.body.profile = file ? file.filename : null;
    let data = req.body;
    if (data.hobbies && data.hobbies == '') data.hobbies = [];
    var user = new User(data);
    user.save((err, result) => {
        if (err) {
            if (file) fs.unlink(path.join(req.file.path))
            res.send(err)
        }
        else res.status(200).send({ 'message': 'Successfully added user' })
    })
}

exports.getUsers = (req, res) => {
    User.find()
        .populate('hobbies')
        .populate('type')
        .exec((err, result) => {
            console.log(result)
            if (err) throw err;
            else {
                if (result) res.send(result)
                else res.send([])
            }
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
                res.send({ 'message': 'Successfuly deleted' })
            } else {
                res.send({ 'message': 'Does not exists' })
            }
        }
    })
}

exports.updateUser = (req, res) => {
    let id = req.params.id;
    let profile = req.file.filename
    let data = { ...req.body, profile };
    User.findByIdAndUpdate({ _id: id }, data, (err, result) => {
        if (err) throw err;
        else {
            if (result) {
                const file = result.profile;
                fs.unlink(path.join(filepath + file));
                res.send(result)
            } else {
                res.send({ 'message': 'Does not exists' })
            }
        }
    })
}