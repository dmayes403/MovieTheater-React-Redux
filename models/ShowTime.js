const mongoose = require('mongoose');
const { Schema } = mongoose;

const showTimeSchema = new Schema({
    movieId: String,
    _theater: { type: Schema.Types.ObjectId, ref: 'Theater'},
    startDate: String,
    endDate: String,
    startTime: [String]
});

mongoose.model('showTimes', showTimeSchema);