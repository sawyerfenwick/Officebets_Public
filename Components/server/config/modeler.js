const mongoose = require('mongoose');
const teamSchema = require('../api/models/nhl_team');
const gameSchema = require('../api/models/nhl_game');
const liveGameSchema = require('../api/models/nhl_live_game');
const playerSchema = require('../api/models/nhl_player');

class Modeler {

    constructor() {
        this.start_time = new Date();
    }

    nhl_player(_id, name, team, goals, assists, points) {
        const Player = mongoose.nhl.model('Player', playerSchema);
        console.log("modeler.nhl_player");

        return new Player({
            _id: _id,
            name: name,
            team: team,
            goals: goals,
            assists: assists,
            points: points
        });
    }

    nhl_team(name, games_played, wins, loss, points) {
        console.log("modeler.nhl_team");

        const Team = mongoose.nhl.model('Team', teamSchema);

        return new Team({
            _id: name,
            games_played: games_played,
            wins: wins,
            loss: loss,
            points: points 
        });
        
    }

    nhl_game(date, time, home, away) {
        console.log("modeler.nhl_game");

        const Game = mongoose.nhl.model('Game', gameSchema);

        return new Game({
            _id: new mongoose.Types.ObjectId(),
            date: date,
            time: time,
            home: home,
            away: away
        });

    }

    nhl_live_game(slug, goal_scorer_text, goalie_text, goals, scorers) {
        console.log("modeler.nhl_live_game");

        const LiveGame = mongoose.nhl.model('LiveGame', liveGameSchema);

        return new LiveGame({
            _id: slug,
            goal_scorer_text: goal_scorer_text,
            goalie_text: goalie_text,
            goals: goals,
            scorers: scorers
        });
    }

}

module.exports = Modeler;