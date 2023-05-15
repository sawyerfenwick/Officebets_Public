const Scraper = require('./scraper');
const DataHandler = require('./data_handler');
const Modeler = require('./modeler');
const { start } = require('geckodriver');

class ConfigManager {
    constructor() {
        this.start_time = new Date();
        this.data_handler = new DataHandler();
        this.scraper = new Scraper();
        this.modeler = new Modeler();
    }

    getStartTime() {
        return this.start_time;
    }

    getDate() {
        let today = new Date();

        switch(today.getDay()){
            case 0:
                var day = "Sunday"
                break;
            case 1:
                var day = "Monday"
                break;
            case 2:
                var day = "Tuesday"
                break;
            case 3:
                var day = "Wednesday"
                break;
            case 4:
                var day = "Thursday"
                break;
            case 5:
                var day = "Friday"
                break;
            default:
                var day = "Saturday"
        }

        switch(today.getMonth()) {
            case 0:
                var month = "Jan"
                break;
            case 1:
                var month = "Feb"
                break;
            case 2:
                var month = "Mar"
                break;
            case 3:
                var month = "Apr"
                break;
            case 4:
                var month = "May"
                break;
            case 5:
                var month = "Jun"
                break;
            case 6:
                var month = "Jul"
                break;
            case 7:
                var month = "Aug"
                break;
            case 8:
                var month = "Sep"
                break;
            case 9:
                var month = "Oct"
                break;
            case 10:
                var month = "Nov"
                break;
            default:
                var month = "Dec"
        }

        return day +", " + month + " " + today.getDate().toString();

    }

    convertTime(time){
        if (time.length > 10) {
            if (time[6] == "P") {
                if (time[1] == "2") {
                    return 12;
                }
                else {
                    return Number(time[1]) + 22;
                }
            }
            else {
                if (time[1] == "2") {
                    return 0;
                }
                return Number(time[1]) + 10;
            }
        }
        else {
            if (time[5] == "P") {
                return Number(time[0]) + 12;
            }
            else {
                return Number(time[0]);
            }
        }
    }    

    async live_scraper(end_time) {
        let min = new Date().getMinutes();

        if(min < end_time) {
            let teams = await this.scraper.scrape_nhl_teams();

            for (let t of teams) {
                console.log(await t);
            }
        }
    }

    async init() {
        console.log("Starting up...");

        await this.data_handler.connectToNHL();
        await this.data_handler.connectToUsers();
        //SCRAPE DATA
        // let games = await this.scraper.scrape_nhl_games();
        // let players = await this.scraper.scrape_nhl_players();
        // let teams = await this.scraper.scrape_nhl_teams();
        // let live_games = await this.scraper.scrape_nhl_live_games();
    
        //INSERT INTO DB
        // console.log("LiveGames");
        // for(let l of live_games) {
        //     this.data_handler.nhl_db_add_live_game(await l);
        // }
        // console.log("Games");
        // for(let g of games) {
        //     this.data_handler.nhl_db_add_game(await g);
        // }
        // console.log("Players");
        // for(let p of players) {
        //     this.data_handler.nhl_db_add_player(await p);
        // }
        // console.log("Teams");
        // for(let t of teams) {
        //     this.data_handler.nhl_db_add_team(await t);
        // }
    }
}

module.exports = ConfigManager;