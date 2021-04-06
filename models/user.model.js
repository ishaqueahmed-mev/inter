let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profile: { type: String },
    hobbies: [{
        type: Schema.Types.ObjectId,
        ref: 'Hobby'
    }],
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    dob: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);