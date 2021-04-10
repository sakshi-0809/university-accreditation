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
        const { name, email, _id, department } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { name, email, _id, department } });
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
                department: req.body.department
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
    const { name, email, _id, department } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { name, email, _id, department } });
});

app.listen(4000, () => {
    console.log('Listening at port 4000');
});

