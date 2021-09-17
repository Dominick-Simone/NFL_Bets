const { User, Bet, Game } = require("../../models");

async function updateUserPoints() {
    //event.preventDefault();

    const bet_pick = await Bet.findAll({
        include: [
            {
                model: User,
                attributes: ['id','name', 'points']
            }
        ]
    })

    const gameScores = await Game.findAll({
        attributes: [
            'id',
            'home_team',
            'away_team',
            'point_spread',
            'start_time',
            'home_team_moneyline',
            'away_team_moneyline',
            'home_team_id',
            'away_team_id',
            'status'
        ],
        include: [
            {
                model: Score,
                attributes: ['id','home_score','away_score','game_id']
            }
        ]
    })

    //need to add a for each type block here that checks if home_team_score > away_team_score

    console.log(bet_pick)
    console.log(gameScores)

    if (bet_pick) {
        const response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({
                game_id,
                bet_pick
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log("Users successfully updated")
        } else {
            console.log(response.statusText)
        }
    }
}

updateUserPoints();