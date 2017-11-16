const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const Theater = mongoose.model('theaters');

module.exports = app => {

    app.post('/api/theaters', async (req, res) => {
        const theater = new Theater({
            room: 'Nero'
        });

        theater.save();

        res.send(theater);
    });

    app.get('/api/theaters', async (req, res) => {
        const theaters = await Theater.find({}, (err, theaters) => {
            res.send(theaters);
        });
    })
};