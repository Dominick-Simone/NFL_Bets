const router = require("express").Router()

const homepageRoutes = require("./homepage-routes")
const loginRoutes = require("./login-routes")
const leaderboardRoutes = require("./leaderboard-routes")

router.use("/", homepageRoutes);
router.use("/login", loginRoutes);
router.use("/leaderboard", leaderboardRoutes);

module.exports = router;
