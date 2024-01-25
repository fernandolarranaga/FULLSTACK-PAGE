const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'regular'
    }
});

const User = model('User', userSchema);

module.exports = User;





