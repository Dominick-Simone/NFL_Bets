const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Bet extends Model {}

Bet.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    bet_pick: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    game_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'game',
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'bet'
}
);

module.exports = Bet;