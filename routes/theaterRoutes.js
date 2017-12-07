const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const moment = require('moment');
const requireLogin = require('../middlewares/requireLogin');

const Theater = mongoose.model('theaters');
const ShowTime = mongoose.model('showTimes');

module.exports = app => {

    app.post('/api/theaters', requireLogin, async (req, res) => {
        console.log(req.body);
        const theater = new Theater({
            room: req.body.theaterName
        });

        theater.save().then(() => {
            Theater.find({}).then(theaters => {
                res.send(theaters);
            });
        });
    });

    app.get('/api/theaters', async (req, res) => {
        const theaters = await Theater.find({}, (err, theaters) => {
            res.send(theaters);
        });
    })

    app.post('/api/newShowing', requireLogin, async (req, res) => {
        ShowTime.remove({ movieId: req.body.movieId }).then(() => {
            req.body.showDetails.map(singleShowing => {
                console.log(singleShowing.startDate);
                const showTime = new ShowTime({
                    movieId: req.body.movieId,
                    _theater: singleShowing.theaterChoice._id,
                    startDate: singleShowing.startDate,
                    endDate: singleShowing.endDate ? singleShowing.endDate : singleShowing.startDate,
                    startTime: singleShowing.timeOptions
                });
    
                showTime.save();
                newTime = moment(req.body.showDetails[0].time);
                console.log(newTime);
            });

            res.send('success');
        });
    });

    app.get('/api/showings', async (req, res) => {
        const showings = await ShowTime.find({}, (err, showTimes) => {
            res.send(showTimes);
        })
    });

    app.get('/api/showingsById/:id', async (req, res) => {
        const showings = await ShowTime.find({movieId: req.params.id}, (err, showTimes) => {
            res.send(showTimes);
        })
    });

    app.delete('/api/showing/:id', async (req, res) => {
        // ShowTime.remove({ movieId: req.params.id }, (err, success) => {
        //     res.json({ message: 'Successfully deleted' });
        // });

        ShowTime.remove({ movieId: req.params.id }).then(() => {
            res.json({ message: 'Successfully deleted' });
        });
    });

    app.delete(`/api/theaters/:id`, requireLogin, async (req, res) => {
        Theater.remove({ _id: req.params.id}).then(() => {
            res.json({ message: 'Successfully deleted theater' });
        });
    });
};