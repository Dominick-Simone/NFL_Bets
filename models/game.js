const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    home_team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    away_team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },  
    score_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    point_spread: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    home_team_moneyline: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    away_team_moneyline: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stadium_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    playing_surface: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    channel: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'game'
}
);

module.exports = Game;