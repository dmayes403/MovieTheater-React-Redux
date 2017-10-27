const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys')

// *** wire this up for authentication (services) *** require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // ^^ this is equal to: 30 days * 24 hours * 60 minutes * 60 seconds * 1000 miliseconds.
        keys: [keys.cookieKey]
        // ^^ this is used to encrypt. These two properties are required for cookies. Multiple keys are
        // allowed for multiple levels of security
    })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV = 'productions') { // ****
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);