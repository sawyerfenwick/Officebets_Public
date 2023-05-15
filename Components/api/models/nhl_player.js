const mongoose = require('mongoose');

const nhlPlayerSchema = mongoose.Schema({
    _id: { type: Number, required: true},
    name: { type: String, required: true},
    team: { type: String, required: true},
    goals: { type: Number, required: true},
    assists: { type: Number, required: true},
    points: { type: Number, required: true} 
});

module.exports = nhlPlayerSchema;