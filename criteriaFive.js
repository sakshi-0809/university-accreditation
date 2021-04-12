const mongoose = require('mongoose');

const criteriaFive = new mongoose.Schema({
    department: String,
    facultyName: String,
    email: String,
    subCategory1: {
        salary: Number,
        designation: String,
        qualifications: String,
        joiningDate: Date,
        publications: String,
        researchInteractions: String,
    },
    subCategory4: {
        joiningDate: Date,
    },
    subCategory5: {
        specialization: String,
        publications: [String],
        courseDevelopments: [String],
    },
    subCategory6: {
        workshops: [String],
        courseModules: [String]
    }
});

module.exports = mongoose.model('CriteriaFive', criteriaFive);