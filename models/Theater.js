const mongoose = require('mongoose');
const { Schema } = mongoose;

const theaterSchema = new Schema({
    room: String
});

mongoose.model('theaters', theaterSchema);