const router = require("express").Router()

const homepageRoutes = require("./homepage-routes")
const userRoutes = require("./user-routes")
const leaderboardRoutes = require("./leaderboard-routes")
const gameRoutes = require("./game-routes")
const betRoutes = require("./bet-routes")

router.use("/", homepageRoutes);
router.use("/users", userRoutes);
//router.use("/leaderboard", leaderboardRoutes);
router.use("/games", gameRoutes);
router.use("/bets", betRoutes);

module.exports = router;
