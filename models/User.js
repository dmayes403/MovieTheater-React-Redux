const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: [String],
    creator: Boolean,
    admin: Boolean
});

mongoose.model('users', userSchema);