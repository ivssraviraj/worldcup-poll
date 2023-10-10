
const Sequelize = require('sequelize');

const seq = require('../util/database')



const matches =seq.define('match',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    }, date:{
        type:Sequelize.DATE
    },
    location:{
        type:Sequelize.STRING
    },
    homeTeam:{
        type:Sequelize.STRING
    },
    awayTeam:{
        type:Sequelize.STRING
    },winner:{
        type:Sequelize.STRING,
        defaultValue: ""
    }


});

module.exports = matches;


