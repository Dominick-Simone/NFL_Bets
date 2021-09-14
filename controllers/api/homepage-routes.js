const router = require("express").Router()
const axios = require("axios");
const { User } = require("../../models");

router.get("/", async (req, res) => {
    const responses = await axios('https://api.sportsdata.io/v3/nfl/scores/json/Schedules/2021?key=dc38a7fee2fb41cbba3e83295daac591')
    res.json(responses.data)
    //console.log(res.json)
})

module.exports = router;