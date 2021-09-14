const User = require('./user');
const Game = require('./game');
const Bet = require('./bet');

// a single bet belongs to the user who made the bet
Bet.belongsTo(User, {
    foreignKey: 'user_id'
});
// a single bet also belongs to the game the bet is on
Bet.belongsTo(Game, {
    foreignKey: 'game_id'
})
// games have many bets 
Game.hasMany(Bet, {
    foreignKey: 'game_id'
})
// a single user has many bets
User.hasMany(Bet, {
    foreignKey: 'user_id'
})



module.exports = { User, Game, Bet };