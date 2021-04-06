let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let hobbySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Hobby', hobbySchema);