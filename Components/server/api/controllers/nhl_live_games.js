const mongoose = require('mongoose');
const LiveGameSchema = require('../models/nhl_live_game');

exports.get_live_games = (req, res, next) => {

    const LiveGame = mongoose.nhl.model('LiveGame', LiveGameSchema);

    LiveGame.find()
        .select()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length, 
                games: docs.map(doc => {
                    return {
                        _id: doc._id,
                        slug: doc.slug,
                        goal_scorer_text: doc.goal_scorer_text,
                        goalie_text: doc.goalie_text,
                        goals: doc.goals,
                        scorers: doc.scorers
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => { 
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.get_live_game_by_slug = (req, res, next) => {

    const LiveGame = mongoose.nhl.model('LiveGame', LiveGameSchema);
    const slug = req.params.slug;
    
    LiveGame.findOne( { slug: slug })
        .exec()
        .then(doc => {
            console.log("From MongoDB Atlas: \n", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: slug + " Live Game Not Found"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
