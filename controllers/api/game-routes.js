const router = require("express").Router()
const axios = require("axios");
const { withAuth } = require('../../utils/helpers');
const { User, Game, Bet, Team } = require("../../models");

router.get('/teamscheck', withAuth, (req, res) => {
    Team.findAll({
        include: [
            {
                model: Game
            }
        ]
    })
    .then(gameData => {
        const games = gameData.map(game => game.get({ plain: true }));
        console.log(games)
        //res.status(200).json
    })
    .catch (err => {
        console.log(err)
        res.status(500).json(err);
    });
});





// router.get("/", async (req, res) => {
//     const responses = await axios('https://api.sportsdata.io/v3/nfl/scores/json/Schedules/2021?key=dc38a7fee2fb41cbba3e83295daac591')
//     //res.json(responses.data)
//     .then((res) => res.json())
//     .then((response) => {
//         for (var i = 0; i < response.data.length; i++) {
//             var home_team = response.data.HomeTeam
//             var away_team = response.data.AwayTeam
//             var start_time = response.data.DateTime
//             var score_id = response.data.ScoreID
//             var status = response.data.Status
//             var point_spread = response.data.PointSpread
//             var home_team_moneyline = response.data.HomeTeamMoneyline
//             var away_team_moneyline = response.data.AwayTeamMoneyline
//             //return response1
//             console.log(home_team)
//             console.log(away_team)
//         }
//     })
// });




// router.get("/", (req, res) => {
//     axios('https://api.sportsdata.io/v3/nfl/scores/json/Schedules/2021?key=dc38a7fee2fb41cbba3e83295daac591') 
    
    
    // .then(function (response) {
    //     console.log(response.data)
        // for (var i = 0; i < response.data.length; i++) {
        //     var home_team = response.data.HomeTeam
        //     var away_team = response.data.AwayTeam
        //     var start_time = response.data.DateTime
        //     var score_id = response.data.ScoreID
        //     var status = response.data.Status
        //     var point_spread = response.data.PointSpread
        //     var home_team_moneyline = response.data.HomeTeamMoneyline
        //     var away_team_moneyline = response.data.AwayTeamMoneyline
        //     //return response1
        //     console.log(home_team)
        //     console.log(away_team)
    //     }
    // })
    // .catch(function(error) {
    //     console.log(error)
    // })
    //console.log()
//})

module.exports = router;