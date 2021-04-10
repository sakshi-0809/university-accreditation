const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    department: String,
    isCoordinator: Boolean
});

module.exports = mongoose.model('User', user);
