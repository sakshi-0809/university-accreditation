const mongoose = require('mongoose');

const criteriaFive = new mongoose.Schema({
    department: String,
    name: String,
    email: String,
    data: [
        {
            key: String,
            title: String,
            dataType: String,
            value: String
        }
    ]
});

module.exports = mongoose.model('CriteriaFive', criteriaFive);