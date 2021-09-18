const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Game, Bet } = require("../../models");
const Score = require('../../models/score');
const Team = require('../../models/team');
const { withAuth } = require('../../utils/helpers');
// get all games and render the homepage

router.get('/', (req,res) => {
    res.render('landing', {
        layout: false
    })
})
router.get('/schedule', withAuth, (req, res) => {

    console.log(req.session.loggedIn);

    Game.findAll({
        attributes: [
            'id',
            'home_team',
            'away_team',
            'point_spread',
            'start_time',
            'home_team_moneyline',
            'away_team_moneyline',
            'status'
        ],
        include: [
            {
                //model: Team,
                model: Score,
                //foreignKey: 'home_team_id',
                //attributes: ['id','abbreviation','full_name','logo'],
                attributes: ['id','home_score','away_score','game_id']
            }
        ]
    })
    .then(gameData => {
        const games = gameData.map(game => game.get({ plain: true }));
        console.log(games)
        res.render('homepage', {
            games,
            loggedIn: true
        });
    })
    .catch (err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// get all users and render the leaderboard
router.get('/leaderboard', (req, res) => {
    console.log(req.session);

    User.findAll({
        attributes: [
            'id',
            'name',
            'email',
            'fav_team',
            'points'
        ],
        order: [['points', 'DESC']]
    })
    .then(userData => {
        const users = userData.map(user => user.get({ plain: true }));
        res.render('leaderboard', {
            users,
            loggedIn: req.session.loggedIn
        });
    })
    .catch (err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// make sure the user is redirected to the homepage if they are logged in
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('login')
    }
});

// make sure the user is redirected to the homepage if they are logged in
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup')
});

// redirect the user to the single game page when they click the game 
router.get('/game/:id', async (req, res) => {
    const gameData = await Game.findByPk(req.params.id, {
        attributes: [
            'id',
            'home_team',
            'away_team',
            'point_spread',
            'start_time',
            'home_team_moneyline',
            'away_team_moneyline'
        ],
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
        include: [
            {
                model: Bet,
                attributes: ['id','bet_pick', 'user_id', 'game_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
        ]
    });

    const oneGame = gameData.get({ plain: true });
    console.log(oneGame)

    res.render('single-game', {
        game: oneGame,
        loggedIn: req.session.loggedIn
    });
});

// only render games that the user's favorite team is playing in on the dashboard
router.get('/dashboard', (req, res) => {
    console.log(req.session);
    let users;
    User.findAll({
        attributes: [
            'id',
            'name',
            'email',
            'fav_team',
            'points'
        ],
        order: [['points', 'DESC']]
    })
    .then(userData => {
        users = userData.map(user => user.get({ plain: true }));
    })
    Game.findAll({
        where: {
            [Op.or]: [
                { home_team: req.session.fav_team },
                { away_team: req.session.fav_team }
            ]
        },
        attributes: [
            'id',
            'home_team',
            'away_team',
            'point_spread',
            'start_time',
            'home_team_moneyline',
            'away_team_moneyline'
        ]
    })
    // 
    .then(gameData => {
        const games = gameData.map(game => game.get({ plain: true }));
        // SOCKET IO CODE TO GET THE TWEETS HERE 
        res.render('dashboard', {
            games,
            users,
            loggedIn: req.session.loggedIn
            //,fav_team: req.session.fav_team 
        });
    })
    .catch (err => {
        console.log(err)
        res.status(500).json(err);
    });
});

module.exports = router;
