const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./user');
const CriteriaFive = require('./criteriaFive');
const JWT = require('jsonwebtoken');
const passportConfig = require('./passportConfig');
const metaphone = require('metaphone');
const nodemailer = require("nodemailer");

mongoose.connect('mongodb://localhost/universityaccreditation', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log("connected to mongodb");
}).on('error', (err) => {
    console.log('connection error:', err)
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(
    session({
        secret: 'secretcode',
        resave: false,
        saveUninitialized: false,
    }));

app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())

const signToken = userID => {
    return JWT.sign({
        iss: "Tanishq",
        sub: userID
    }, "secretcode", { expiresIn: "1h" });
}

app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { name, email, _id, department, isCoordinator } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { name, email, _id, department, isCoordinator } });
    }
})

app.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { email: "" }, success: true });
})

app.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }, async (err, doc) => {
        if (err)
            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
        if (doc)
            res.status(400).json({ message: { msgBody: 'User with this email is already present', msgError: true } });
        if (!doc) {
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                password: hashedPass,
                email: req.body.email,
                name: req.body.name,
                department: req.body.department,
                isCoordinator: req.body.isCoordinator
            });
            await newUser.save(err => {
                if (err) {
                    res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
                }
                else {
                    res.status(201).json({ message: { msgBody: 'Account successfully created', msgError: false } });
                }
            });
        }
    })
})

app.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { name, email, _id, department, isCoordinator } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { name, email, _id, department, isCoordinator } });
});

app.post('/changeprofile', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({ email: req.body.email }, async (err, doc) => {
        if (err)
            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
        if (doc) {
            if (req.body.name !== undefined) {
                doc.name = req.body.name
            }

            if (req.body.phone !== undefined) {
                doc.phone = req.body.phone
            }

            if (req.body.address !== undefined) {
                doc.address = req.body.address;
            }

            if (req.body.changePassword) {
                doc.password = await bcrypt.hash(req.body.newPassword, 10);
            }

            await doc.save(err => {
                if (err) {
                    res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
                }
                else {
                    res.status(201).json({ message: { msgBody: 'Changes successfully saved', msgError: false } });
                }
            })
        }
    })
});

app.post('/updatedetails', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.body.criteria === 5) {
        CriteriaFive.findOne({ email: req.body.email }, async (err, doc) => {
            if (err)
                res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
            if (doc) {
                req.body.data.map(sub => {
                    if (sub.key === "subCategory1") {
                        if (sub.title === "Designation" && sub.value !== '') {
                            doc.subCategory1.designation = sub.value;
                        } else if (sub.title === "Salary Details" && sub.value !== '') {
                            doc.subCategory1.salary = sub.value;
                        } else if (sub.title === "Publications" && sub.value !== '') {
                            doc.subCategory1.publications = sub.value;
                        } else if (sub.title === "Joining Date" && sub.value !== '') {
                            doc.subCategory1.joiningDate = sub.value;
                        } else if (sub.title === "Research Interactions" && sub.value !== '') {
                            doc.subCategory1.researchInteractions = sub.value;
                        }
                    }
                });

                await doc.save(err => {
                    if (err) {
                        res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
                    }
                    else {
                        res.status(201).json({ message: { msgBody: 'Changes successfully saved', msgError: false } });
                    }
                })
            }
            else if (!doc) {
                const newData = new CriteriaFive({
                    department: req.body.department,
                    name: req.body.name,
                    email: req.body.email,
                    subCategory1: {
                        salary: 0,
                        designation: '',
                        qualifications: '',
                        joiningDate: new Date(),
                        publications: '',
                        researchInteractions: '',
                    },
                    subCategory4: {
                        joiningDate: new Date(),
                    },
                    subCategory5: {
                        specialization: '',
                        publications: [],
                        courseDevelopments: [],
                    },
                    subCategory6: {
                        workshops: [],
                        courseModules: []
                    }
                });

                req.body.data.map(sub => {
                    if (sub.key === "subCategory1") {
                        if (sub.title === "Designation") {
                            newData.subCategory1.designation = sub.value;
                        } else if (sub.title === "Salary Details") {
                            newData.subCategory1.salary = sub.value;
                        } else if (sub.title === "Publications") {
                            newData.subCategory1.publications = sub.value;
                        } else if (sub.title === "Joining Date") {
                            newData.subCategory1.joiningDate = sub.value;
                        } else if (sub.title === "Research Interactions") {
                            newData.subCategory1.researchInteractions = sub.value;
                        }
                    }
                });

                await newData.save(err => {
                    if (err) {
                        res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
                    }
                    else {
                        res.status(201).json({ message: { msgBody: 'Changes successfully saved', msgError: false } });
                    }
                })
            }
        })
    }
});

app.get('/fetchcriteria5', passport.authenticate('jwt', { session: false }), (req, res) => {
    // const { name, email, _id, department, isCoordinator } = req.user;
    const { email } = req.user;
    CriteriaFive.findOne({ email: email }, async (err, doc) => {
        if (err)
            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
        if (doc) {
            res.status(200).json({ message: { msgBody: 'Success', msgError: false }, data: doc });
        } else if (!doc) {
            res.status(200).json({ message: { msgBody: 'Data not found', msgError: true } });
        }
    })
})

app.listen(4000, () => {
    console.log('Listening at port 4000');
});

