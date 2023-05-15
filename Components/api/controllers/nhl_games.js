const mongoose = require('mongoose');
const GameSchema = require('../models/nhl_game');
const Logger = require('../../config/logger');

exports.get_game = (req, res) => {

    const Game = mongoose.nhl.model('Game', GameSchema);

    Game.find()
        .select()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                games: docs.map(doc => {
                    return {
                        _id: doc._id,
                        date: doc.date,
                        time: doc.time,
                        home: doc.home,
                        away: doc.away
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

exports.get_game_by_date = (req, res) => {

    const Game = mongoose.nhl.model('Game', GameSchema);
    
    const date = req.params.date;

    Game.find( {date: date} )
        .exec()
        .then(doc => {
            console.log("From MongoDB Atlas: \n", doc);
            if (doc.length > 0) {
                res.status(200).json(doc);
            }
            else {
                Logger.error_404(res, "No Games on " + date);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}