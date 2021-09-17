const axios = require('axios');
const sequelize = require('../../config/connection');
const router = require("express").Router();
const fs = require("fs")
const { Game } = require('../../models');

router.get("/seed-games", async (req, res) => {
    try {
        const games = [];
        const responses = await axios('https://api.sportsdata.io/v3/nfl/scores/json/Schedules/2021?key=dc38a7fee2fb41cbba3e83295daac591')
        const week = await responses.data.filter(game => game.Week == 1)
        for(i=0; i < week.length; i++) {
            const gameID = week[i].GameKey
            const team1 = week[i].HomeTeam
            const team2 = week[i].AwayTeam
            const team1ID = week[i].GlobalHomeTeamID
            const team2ID = week[i].GlobalAwayTeamID
            const pointSpread = week[i].PointSpread
            const status = week[i].Status
            const homeTeamMoneyLine = week[i].HomeTeamMoneyLine
            const awayTeamMoneyLine = week[i].AwayTeamMoneyLine
            const stadiumName = week[i].StadiumDetails.Name
            const startTime = week[i].DateTime
            const playingSurface = week[i].StadiumDetails.PlayingSurface
            const stadiumType = week[i].StadiumDetails.Type
            const scoreId = week[i].ScoreID
            const channel = week[i].Channel
            const newGame = {
                id: gameID,
                home_team: team1,
                away_team: team2,
                home_team_id: team1ID,
                away_team_id: team2ID,
                status: status,
                point_spread: pointSpread,
                home_team_moneyline: homeTeamMoneyLine,
                away_team_moneyline: awayTeamMoneyLine,
                stadium_name: stadiumName,
                start_time: startTime,
                score_id: scoreId,
                playing_surface: playingSurface,
                stadium_type: stadiumType,
                channel: channel
            }
            games.push(newGame)
        }
        const jsonFile = JSON.stringify(games)
        fs.writeFile("./seeds/gameData.json", jsonFile, (err) => {
            console.log(err)
        })
        res.json("success")
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.get("/seed-teams", async (req, res) => {
    try {
        const teamsArray = [];
        const responses = await axios('https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=dc38a7fee2fb41cbba3e83295daac591')
        const teams = await responses.data
        for(i=0; i < teams.length; i++) {
            const abbreviation = teams[i].Key
            const full_name = teams[i].FullName
            const logo = teams[i].WikipediaLogoUrl
            const globalTeamID = teams[i].TeamID
        
            const newTeam = {
                id: globalTeamID,
                abbreviation: abbreviation,
                full_name: full_name,
                logo: logo,
            }
            teamsArray.push(newTeam)
        }
        const jsonFile = JSON.stringify(teamsArray)
        fs.writeFile("./seeds/teamData.json", jsonFile, (err) => {
            console.log(err)
        })
        res.json("success")
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.get("/seed-scores", async (req, res) => {
    try {
        const scoresArray = [];
        const responses = await axios('https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2021/1?key=dc38a7fee2fb41cbba3e83295daac591')
        const scores = await responses.data
        for(i=0; i < scores.length; i++) {
            const ScoreID = scores[i].GameKey
            const home_score = scores[i].HomeScore
            const away_score = scores[i].AwayScore
        
            const newScore = {
                id: ScoreID,
                home_score: home_score,
                away_score: away_score,
                game_id: ScoreID
            }
            scoresArray.push(newScore)
        }
        const jsonFile = JSON.stringify(scoresArray)
        fs.writeFile("./seeds/scoreData.json", jsonFile, (err) => {
            console.log(err)
        })
        res.json("success")
    } catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = router;