const router = require('express').Router();
const { Bet } = require('../../models');
const helpers = require('../../utils/helpers');

const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
}

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Bet.create({
            bet_pick: req.body.bet_pick,
            game_id: req.body.game_id,
            user_id: req.session.user_id,
        })
        .then(betData => res.json(betData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

module.exports = router;