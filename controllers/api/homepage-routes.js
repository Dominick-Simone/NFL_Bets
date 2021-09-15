const axios = require('axios');
const sequelize = require('../../config/connection');
const router = require("express").Router();
const { Game } = require('../../models');

router.get("/", async (req, res) => {
    try {
        const games = [];
        const responses = await axios('https://api.sportsdata.io/v3/nfl/scores/json/Schedules/2021?key=dc38a7fee2fb41cbba3e83295daac591')
        const week = await responses.data.filter(game => game.Week == 2)
        for(i=0; i < week.length; i++) {
            const team1 = week[i].HomeTeam
            const team2 = week[i].AwayTeam
            const pointSpread = week[i].PointSpread
            const status = week[i].Status
            const homeTeamMoneyLine = week[i].HomeTeamMoneyLine
            const awayTeamMoneyLine = week[i].AwayTeamMoneyLine
            const stadiumName = week[i].StadiumDetails.Name
            const startTime = week[i].DateTime
            const playingSurface = week[i].StadiumDetails.PlayingSurface
            const type = week[i].StadiumDetails.Type
            const scoreId = week[i].ScoreID
            const channel = week[i].Channel
            const newGame = {
                home_team: team1,
                away_team: team2,
                status: status,
                point_spread: pointSpread,
                home_team_moneyline: homeTeamMoneyLine,
                away_team_moneyline: awayTeamMoneyLine,
                stadium_name: stadiumName,
                start_time: startTime,
                score_id: scoreId,
                playing_surface: playingSurface,
                type: type,
                channel: channel
            }
            games.push(newGame)
        }
        const toDatabase = async () => {
            await sequelize.sync({ force: true });
          
            await Game.bulkCreate(games, {
              individualHooks: true,
              returning: true,
            });
          
            process.exit(0);
          };
        console.log(games)
        res.json("Success")
        toDatabase()
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;