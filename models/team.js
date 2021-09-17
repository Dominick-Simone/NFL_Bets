const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // home_team_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'game',
    //         id: 'home_team_id'
    //     }
    // },
    // away_team_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'game',
    //         id: 'home_team_id'
    //     }
    // },
    
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'team'
}
);

module.exports = Team;