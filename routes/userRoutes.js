const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const moment = require('moment');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');

module.exports = app => {
    app.get('/api/users', async (req, res) => {
        User.find({}).then(users => {
            res.send(users);
        })
    })
};