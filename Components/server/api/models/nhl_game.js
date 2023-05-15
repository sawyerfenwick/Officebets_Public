const mongoose = require('mongoose');

const nhlGameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: String, required: true },
    time: { type: String, required: true }, 
    home: { type: String, required: true },
    away: { type: String, required: true }
});

module.exports = nhlGameSchema;