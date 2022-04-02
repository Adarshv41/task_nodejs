const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true},
    password: { type: String, minlength: 8}
});

const User = mongoose.model('User', userSchema);

module.exports = User; 