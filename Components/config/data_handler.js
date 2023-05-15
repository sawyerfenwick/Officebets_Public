const mongoose = require('mongoose');
const teamSchema = require('../api/models/nhl_team');
const gameSchema = require('../api/models/nhl_game');
const liveGameSchema = require('../api/models/nhl_live_game');
const playerSchema = require('../api/models/nhl_player');

class DataHandler {

    constructor() {
        this.start_time = new Date();
    }

    //Connections 
    async connectToNHL() {
        console.log("data_handler.connectToNHL");
        
        mongoose.nhl = mongoose.createConnection("mongodb+srv://sawyerfenwick:WPXNyWF5YKR4mnMO@alpha.heburfg.mongodb.net/?retryWrites=true&w=majority", { dbName: "NHL" });
    
        await mongoose.nhl.model('Team', require('../api/models/nhl_team')); 
        await mongoose.nhl.model('Player', require('../api/models/nhl_player')); 
        await mongoose.nhl.model('Game', require('../api/models/nhl_game')); 
        await mongoose.nhl.model('LiveGame', require('../api/models/nhl_live_game')); 

    }

    async connectToUsers() {
        console.log("data_handler.connectToUsers");

        mongoose.users = mongoose.createConnection("mongodb+srv://sawyerfenwick:WPXNyWF5YKR4mnMO@alpha.heburfg.mongodb.net/?retryWrites=true&w=majority", { dbName: "Users" });

        await mongoose.users.model('User', require('../api/models/user'));

    }

    //PLAYERS

    //add
    nhl_db_add_player(player) {
        player.save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    //update
    async nhl_db_update_player_goals(id, goals) {
        let player = await this.nhl_db_get_player_by_id(id);    
        
        //check for diff here
        if (player.goals != goals) {
            player.goals = goals;
            //this updates 
            player.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        }   
    }

    async nhl_db_update_player_assists(id, assists) {
        let player = await this.nhl_db_get_player_by_id(id);

        //check for diff here
        if (player.assists != assists) {
            player.assists = assists;
            //this updates 
            player.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        } 
    }

    async nhl_db_update_player_points(id, points) {
        let player = await this.nhl_db_get_player_by_id(id);

        //check for diff here
        if (player.points != points) {
            player.points = points;
            //this updates 
            player.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        } 
    }

    //get
    async nhl_db_get_all_players() {
        const Player = mongoose.nhl.model('Player', playerSchema);

        return Player.find()
            .exec()
            .then(docs => {
                if (docs) {
                    return docs;
                }
                else {
                    console.log("No Players");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    async nhl_db_get_player_by_id(id) {
        const Player = mongoose.nhl.model('Player', playerSchema);

        return Player.findById(id)
            .exec()
            .then(doc => {
                console.log("From MongoDB Atlas: \n", doc);
                if (doc) {
                    return doc;
                }
                else {
                    console.log("not found");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    async nhl_db_get_players_by_team(team) {
        const Player = mongoose.nhl.model('Player', playerSchema);

        return Player.find( {team: team} )
            .exec()
            .then(docs => {
                if (docs) {
                    return docs;
                }
                else {
                    console.log("Not found");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    //GAMES

    //add
    nhl_db_add_game(game) {
        game.save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });

    }

    //get
    async nhl_db_get_all_games() {
        const Game = mongoose.nhl.model('Game', gameSchema);

        return Game.find()
            .exec()
            .then(docs => {
                if (docs) {
                    return docs;
                }
                else {
                    console.log("No Games");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    async nhl_db_get_games_by_date(date) {
        const Game = mongoose.nhl.model('Game', gameSchema);

        return Game.find( {date: date} )
            .exec()
            .then(docs => {
                if (docs) {
                    return docs;
                }
                else {
                    console.log("Not found");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    async nhl_db_get_games_by_team(team) {
        const Game = mongoose.nhl.model('Game', gameSchema);
        
        return Game.find( {home: team})
            .exec()
            .then(docs => {
                if (docs) {
                    return docs;
                }
                else {
                    console.log("Not found");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    //LIVEGAMES

    //add
    nhl_db_add_live_game(live_game) {
        live_game.save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    //update
    async nhl_db_update_live_game_goal_scorers_text(id, goal_scorers_text) {
        let live_game = await this.nhl_db_get_live_game_by_id(id);    
        
        //check for diff here
        if (live_game.goal_scorers_text != goal_scorers_text) {
            live_game.goal_scorers_text = goal_scorers_text;
            //this updates 
            live_game.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        }  
    }

    async nhl_db_update_live_game_goalie_text(slug, goalie_text) {
        let live_game = await this.nhl_db_get_live_game_by_slug(slug);    
        
        //check for diff here
        if (live_game.goalie_text != goalie_text) {
            live_game.goalie_text = goalie_text;
            //this updates 
            live_game.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        } 
    }

    async nhl_db_update_live_game_goals(slug, goals) {
        let live_game = await this.nhl_db_get_live_game_by_slug(slug);    
        
        //check for diff here
        if (live_game.goals != goals) {
            live_game.goals = goals;
            //this updates 
            live_game.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        } 
    }

    async nhl_db_update_live_game_scorers(slug, scorers) {
        let live_game = await this.nhl_db_get_live_game_by_slug(slug);    
        
        //check for diff here
        if (live_game.scorers != scorers) {
            live_game.scorers = scorers;
            //this updates 
            live_game.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        } 
    }

    //get
    async nhl_db_get_all_live_games() {
        const LiveGame = mongoose.nhl.model('LiveGame', liveGameSchema);

        return LiveGame.find()
            .exec()
            .then(docs => {
                if (docs) {
                    return docs;
                }
                else {
                    console.log("No Live Games");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    async nhl_db_get_live_game_by_id(id) {
        const LiveGame = mongoose.nhl.model('LiveGame', liveGameSchema);

        return LiveGame.findById(id)
            .exec()
            .then(doc => {
                if (doc) {
                    return doc;
                }
                else {
                    console.log(id, " not playing right now");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    //TEAMS

    //add
    nhl_db_add_team(team) {
        team.save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    //update
    async nhl_db_update_team_games_played(id, games_played) {
        let team = await this.nhl_db_get_team_by_id(id);    
        
        //check for diff here
        if (team.games_played != games_played) {
            team.games_played = games_played;
            //this updates 
            team.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        }   
    }

    async nhl_db_update_team_wins(id, wins) {
        let team = await this.nhl_db_get_team_by_id(id);    
        
        //check for diff here
        if (team.wins != wins) {
            team.wins = wins;
            //this updates 
            team.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        } 
    }

    async nhl_db_update_team_loss(id, loss) {
        let team = await this.nhl_db_get_team_by_id(id);    
        
        //check for diff here
        if (team.loss != loss) {
            team.loss = loss;
            //this updates 
            team.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        } 
    }

    async nhl_db_update_team_points(id, points) {
        let team = await this.nhl_db_get_team_by_id(id);    
        
        //check for diff here
        if (team.points != points) {
            team.points = points;
            //this updates 
            team.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            console.log("Nothing to Update.");
        } 
    }

    //get
    async nhl_db_get_all_teams() {
        const Team = mongoose.nhl.model('Team', teamSchema);

        return Team.find()
            .exec()
            .then(docs => {
                if (docs) {
                    return docs;
                }
                else {
                    console.log("No Players");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    async nhl_db_get_team_by_id(id) {
        const Team = mongoose.nhl.model('Team', teamSchema);

        return Team.findById(id)
            .exec()
            .then(doc => {
                if (doc) {
                    return doc;
                }
                else {
                    console.log("No Team");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = DataHandler;