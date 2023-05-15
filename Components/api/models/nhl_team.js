const mongoose = require('mongoose');

const nhlTeamSchema = mongoose.Schema({
    _id: { type: String, required: true },
    games_played: { type: Number, required: true },
    wins: { type: Number, required: true },
    loss: { type: Number, required: true },
    points: { type: Number, required: true }
});

module.exports = nhlTeamSchema;