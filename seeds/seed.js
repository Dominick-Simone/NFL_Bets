const sequelize = require('../config/connection');
const { User, Game, } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const teamData = require('./teamData.json');
const scoreData = require('./scoreData.json')
const Team = require('../models/team');
const Score = require('../models/score');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Team.bulkCreate(teamData, {
    individualHooks: true,
    returning: true
  })

  await Game.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });

  await Score.bulkCreate(scoreData, {
    individualHooks: true,
    returning: true
  })

  // await Bet.bulkCreate(betData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();