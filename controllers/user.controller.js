var mongoose = require('mongoose');
var User = require('../models/user.model');
var Hobby = require('../models/hobby.model');
var Type = require('../models/type.model');
var path = require('path')
const fs = require('fs-extra');
const filepath = 'public/uploads/';
var { getDataLength, createData, getData, getSingleData, deleteData, unlinkFiles, updateData } = require('./common.controller')

exports.create = async (req, res) => {
    try {
        const file = req.file;
        req.body.profile = file ? file.filename : null;
        let data = req.body;
        var user = new User(data);
        let result = await createData(user);
        if (result) res.status(200).send({ 'message': 'Successfully added user' })
    } catch (err) {
        if (req.file) unlinkFiles(path.join(req.file.path))
        res.status(500).send(err)
    }

}

exports.getUsers = async (req, res) => {
    try {
        let data = await getData(User, {}, 'hobbies type', { 'created': -1 });
        if (data && data.length) {
            let count = await getDataLength(User, {});
            res.status(200).send({ data: data, length: count })
        }
        else res.send({ data: [], length: 0 })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getUserById = async (req, res) => {
    try {
        let id = req.params.id;
        let query = { _id: id }
        let data = await getSingleData(User, query, 'hobbies type');
        res.send({ data: data })

    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let query = { _id: id };
        let result = await deleteData(User, query);
        if (result) {
            const file = result.profile;
            unlinkFiles(path.join(filepath + file))
            res.send({ 'message': 'Successfuly deleted' })
        }
        else res.send({ 'message': 'Does not exists' })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let profile = req.file && req.file.filename
        let data = { ...req.body, profile };
        let query = { _id: id };
        let result = await updateData(User, data, query);
        if (result) {
            const file = result.profile;
            unlinkFiles(path.join(filepath + file));
            res.send(result)
        } else {
            res.send({ 'message': 'Does not exists' })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.searchUser = async (req, res) => {
    try {
        let search = req.query.search;
        let query = {
            $or: [
                { email: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        };

        let result = await getData(User, query, 'hobbies type');
        if (result && result.length > 0) {
            let count = await getDataLength(User, query);
            res.status(200).send({ data: result, length: count })
        }
        else {
            res.status(200).send({ data: [], length: 0 })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}