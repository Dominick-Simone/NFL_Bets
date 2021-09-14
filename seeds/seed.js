const sequelize = require('../config/connection');
const { User, Game, Bet } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const betData = require('./betData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Game.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });

  await Bet.bulkCreate(betData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();