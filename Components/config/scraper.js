const { By, Builder } = require("selenium-webdriver");
const Modeler = require('./modeler');
require('./data_handler');
require("geckodriver");

class Scraper {
    constructor(){
        
    }

    async scrape_nhl_players() {
        let modeler = new Modeler();

        let driver = await new Builder().forBrowser("firefox").build();

        await driver.manage().setTimeouts( { implicit: 10000 } );

        await driver.get("https://www.nhl.com/stats/skaters?page=0&pageSize=100");

        var pages = await driver.findElement(By.xpath("/html/body/div[1]/div[2]/main/div[5]/div[2]/div[2]/span[2]/input")).getAttribute("max");
      
        let players = [];

        for(let i = 0; i < pages; i++) {

            await driver.get("https://www.nhl.com/stats/skaters?page="+i+"&pageSize=100");
            
            var body = await driver.findElement(By.className("rt-tbody"));          //vice versa, className works better here than xpath. who fucking knows?
            
            var rows = await body.findElements(By.className("rt-tr-group"));

            for(let r of rows) {
                var row = await r.findElements(By.className("rt-td"));
                var id = (await r.findElement(By.css("a")).getAttribute("href")).replace("https://www.nhl.com/player/", "");
                var name = await row[1].getText();
                var team = await row[3].getText();
                var goals = await row[7].getText();
                var assists = await row[8].getText();
                var points = await row[9].getText();
                //POST data
                players.push(modeler.nhl_player(id, name, team, goals, assists, points));
            }

        }
        driver.quit();
        return players;
    }

    async scrape_nhl_teams() {
        let modeler = new Modeler();

        let driver = await new Builder().forBrowser("firefox").build();

        await driver.manage().setTimeouts( { implicit: 10000 } );
        
        await driver.get("https://www.nhl.com/stats/teams");

        var body = await driver.findElement(By.xpath("/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]"));    //for some reason xpath works better here than className

        console.log("body.length = ", body.length);

        var rows = await body.findElements(By.className("rt-tr-group"));

        let teams = [];

        for(let r of rows) {
            var row = await r.findElements(By.className("rt-td"));
            var name = await row[1].getText();
            var games_played = await row[3].getText();
            var wins = await row[4].getText();
            var loss = await row[5].getText();
            var points = await row[7].getText();
            
            teams.push(modeler.nhl_team(name, games_played, wins, loss, points));
        }

        driver.quit();
        return teams;
    }

    async scrape_nhl_games() {
        let modeler = new Modeler();
        console.log("scraper.scrape_nhl_games");
        let driver = await new Builder().forBrowser("firefox").build();
        
        await driver.manage().setTimeouts( { implicit: 10000 } );
        
        await driver.get("https://www.nhl.com/schedule");

        var dates = await driver.findElements(By.className("section-subheader"));
        var tables = await driver.findElements(By.className("day-table-horiz-scrollable-wrapper"));

        let games = [];

        for(let i = 0; i < dates.length; i++){
            var date = await dates[i].getText();
            var rows = await tables[i].findElements(By.className("league-schedule__row"));
            for(let r of rows) {
                var atags = await r.findElements(By.css("a"));
                var away = await atags[0].getText();
                var home = await atags[1].getText();
                var time = await atags[4].getText();
                
                games.push(modeler.nhl_game(date, time, home, away));
            }
        }
        driver.quit();
        return games;
    }

    async scrape_nhl_live_games() {
        let modeler = new Modeler();
        
        let driver = await new Builder().forBrowser("firefox").build();

        await driver.manage().window().maximize();

        await driver.manage().setTimeouts( { implicit: 5000 });

        await driver.get("https://www.nhl.com/scores");

        var ul = await driver.findElement(By.className("nhl-scores__list"));

        var lis = await ul.findElements(By.className("nhl-scores__list-item"));
        
        console.log("lis.length = ", lis.length);

        let i = 1;

        let live_games = [];

        while (await lis[i].getAttribute("id") == "") {
            try {
                var items = await lis[i].findElements(By.className("g5-component--nhl-scores__info-item"));
    
                for (let i of items) {
                        
                    var players = await i.findElements(By.className("g5-component--nhl-scores__info-goal-scorers-item-player"));
                    
                    var goals =  players.length;

                    var slug = await i.findElement(By.className("g5-component--nhl-scores__info-label")).getText();

                    var goal_scorer_text = await i.findElement(By.className("g5-component--nhl-scores__info-goal-scorers")).getText();
                
                    try {
                        var goalie_text = await i.findElement(By.className("g5-component--nhl-scores__info-decisions")).getText();
            
                        let scorers = [];
        
                        for (let p of players) {
                                
                            var id = (await p.getAttribute("href")).toString().replace("https://www.nhl.com/player/", "");
                            scorers.push(id);
        
                        }
                            
                        live_games.push(modeler.nhl_live_game(slug, goal_scorer_text, goalie_text, goals, scorers));
                    }
                    catch (err) {
                        console.log("err: ", err);
                        var goalie_text = " ";
                        let scorers = [];
        
                        for (let p of players) {
                                
                            var id = (await p.getAttribute("href")).toString().replace("https://www.nhl.com/player/", "");
                            scorers.push(id);
        
                        }
                            
                        live_games.push(modeler.nhl_live_game(slug, goal_scorer_text, goalie_text, goals, scorers));
                    }
                }
            }
            catch (err) {
                console.log("err: ", err);
            }
            i++;
        }                                     
        driver.quit();
        return live_games;
    }
}

module.exports = Scraper;