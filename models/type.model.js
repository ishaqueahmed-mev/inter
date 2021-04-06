let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let typeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Type', typeSchema);