const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Score extends Model {}

Score.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    home_score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    away_score: {
        type: DataTypes.INTEGER,
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
    modelName: 'score'
}
);

module.exports = Score;