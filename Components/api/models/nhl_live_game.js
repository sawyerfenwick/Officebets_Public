const mongoose = require('mongoose');

const nhlLiveGameSchema = mongoose.Schema({
    _id: { type: String, required: true },
    goal_scorer_text: { type: String, required: true },
    goalie_text: { type: String, required: true },
    goals: { type: Number, required: true },
    scorers: { type: [Number], required: true }
});

module.exports = nhlLiveGameSchema;