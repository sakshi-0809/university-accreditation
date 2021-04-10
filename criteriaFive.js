const mongoose = require('mongoose');

const criteriaFive = new mongoose.Schema({
    department: String,
    facultyName: String,
    email: String,
    studentFacultyRatio: {
        salary: Number,
        designation: String,
        qualifications: String,
        joiningDate: Date,
        publications: [String],
        researchInteractions: [String],
    },
    facultyRetention: {
        joiningDate: Date,
    },
    facultyCompetencies: {
        specialization: String,
        publications: [String],
        courseDevelopments: [String],
    },
    facultyInnovations: {
        workshops: [String],
        courseModules: [String]
    }
});

module.exports = mongoose.model('CriteriaFive', criteriaFive);