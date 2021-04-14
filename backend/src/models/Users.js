const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    accessLevel: Number
});

module.exports = mongoose.model('User', UserSchema);

