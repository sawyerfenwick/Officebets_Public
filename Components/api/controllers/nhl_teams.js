const mongoose = require('mongoose');
const TeamSchema = require('../models/nhl_team');
const Logger = require('../../config/logger');

exports.teams_get_all = (req, res) => {

    const Team = mongoose.nhl.model('Team', TeamSchema);

    Team.find()
        .select()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                teams: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        games_played: doc.games_played,
                        wins: doc.wins,
                        loss: doc.loss,
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

exports.teams_get_id = (req, res) => {

    const Team = mongoose.nhl.model('Team', TeamSchema);
    const id = req.params.teamId;
    
    Team.findById(id)
        .exec()
        .then(doc => {
            console.log("From MongoDB Atlas: \n", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                Logger.error_404(res, "Team Not Found");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
