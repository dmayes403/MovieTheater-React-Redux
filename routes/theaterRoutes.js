const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const moment = require('moment');

const Theater = mongoose.model('theaters');
const ShowTime = mongoose.model('showTimes');

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

    app.post('/api/newShowing', async (req, res) => {
        req.body.showDetails.map(singleShowing => {
            const showTime = new ShowTime({
                movieId: req.body.movieId,
                _theater: singleShowing.theaterChoice._id,
                startDate: singleShowing.startDate,
                endDate: singleShowing.endDate ? singleShowing.endDate : singleShowing.startDate,
                startTime: singleShowing.timeOptions
            });

            showTime.save();
            newTime = moment(req.body.showDetails[0].time);
        })
    });

    app.get('/api/showings', async (req, res) => {
        const showings = await ShowTime.find({}, (err, showTimes) => {
            res.send(showTimes);
        })
    });
};