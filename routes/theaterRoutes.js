const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

module.exports = app => {
    console.log('route')
    app.get('/api/theaters', (req, res) => {
        console.log('Getting theaters!');
        console.log('Whereeerererere??');
        res.send({data: "theater 1"});
    });
};