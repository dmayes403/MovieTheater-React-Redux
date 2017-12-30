const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys')

// *** wire this up for authentication (services) *** require('./services/passport');
require('./models/Theater');
require('./models/ShowTime');
require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);
// ^^ must create user admin in database to be able to connect!!

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
//         // ^^ this is equal to: 30 days * 24 hours * 60 minutes * 60 seconds * 1000 miliseconds.
        keys: [keys.cookieKey]
//         // ^^ this is used to encrypt. These two properties are required for cookies. Multiple keys are
//         // allowed for multiple levels of security
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/theaterRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/movieDBRoutes')(app);

if (process.env.NODE_ENV = 'productions') { // ****
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);