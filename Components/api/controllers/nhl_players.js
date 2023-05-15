const mongoose = require('mongoose');
const PlayerSchema = require('../models/nhl_player');


exports.players_get_all = (req, res) => {

    const Player = mongoose.nhl.model('Player', PlayerSchema);
    
    Player.find()
        .select()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                players: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        team: doc.team,
                        goals: doc.goals,
                        assists: doc.assists,
                        points: doc.points
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.players_get_id = (req, res) => {

    const Player = mongoose.nhl.model('Player', PlayerSchema);
    const id = req.params.playerId;

    Player.findById(id)
        .exec()
        .then(doc => {
            console.log("From MongoDB Atlas: \n", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: "Player " + id + " not found"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err 
            });
        });
}