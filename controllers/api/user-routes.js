const router = require('express').Router();
const { User } = require("../../models");

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {email: req.body.email} });
        console.log(userData)

        if (!userData) {
            res.status(400).json({ message: 'WRONG EMAIL OR PASSWORD' })
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'WRONG EMAIL OR PASSWORD' })
            return;
        }

        const userInfo = userData.get({ plain: true })
        console.log(userInfo)

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            req.session.fav_team = userData.fav_team;

            res.json({ user: userData, message: 'Woohoo you are logged in!'})
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/signup', (req, res) => {
    console.log(req.body)
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        fav_team: req.body.fav_team
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.loggedIn = true;
            req.session.fav_team = userData.fav_team;

            res.json(userData);
        });
    });
});

router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        
        req.session.destroy(() => {
            res.redirect('/login');
            res.status(204).end();
        });
        
    } else {
        res.status(404).end()
    }
});


module.exports = router;