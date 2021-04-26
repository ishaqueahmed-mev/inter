var mongoose = require('mongoose');
var path = require('path')
const fs = require('fs-extra');
const filepath = 'public/uploads/';

async function createData(model) {
    try {
        let data = await model.save();
        return data;
    } catch (err) {
        throw err
    }
}

async function getData(model, query, pop = null, sort, skip = 0, limit = 0) {
    try {
        let data = await model.find(query).populate(pop).sort(sort).skip(skip).limit(limit).exec();
        return data;
    } catch (err) {
        throw err
    }
}

async function getSingleData(model, query, pop = null) {
    try {
        let data = await model.findOne(query).populate(pop).exec();
        return data;
    } catch (err) {
        throw err
    }
}

async function deleteData(model, query) {
    try {
        let data = await model.findOneAndDelete(query);
        return data;
    } catch (err) {
        throw err
    }
}

async function updateData(model, data, query) {
    try {
        let result = await model.findByIdAndUpdate(query, data);
        return result;
    } catch (err) {
        throw err
    }
}

async function getDataLength(model, query) {
    try {
        let count = await model.count(query);
        return count;
    } catch (err) {
        throw err
    }
}

async function unlinkFiles(path) {
    try {
        fs.unlink(path);
    } catch (err) {
        throw err
    }
}


module.exports = {
    createData,
    getData,
    getSingleData,
    deleteData,
    updateData,
    getDataLength,
    unlinkFiles
}