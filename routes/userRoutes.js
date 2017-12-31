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
    });

    app.post('/api/users', requireLogin, async (req, res) => {
        req.body.forEach((user, index) => {
            User.updateOne({
                _id: user._id
            }, {
                creator: user.creator,
                admin: user.admin
            }).exec();

            if (index === req.body.length - 1) {
                User.find({}).then(users => {
                    res.send(users);
                });
            }
        });
    });
};