
const Sequelize = require('sequelize');

const seq = require('../util/database')



const users =seq.define('user',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userName:{
        type:Sequelize.STRING,

    },email:{
        type:Sequelize.STRING,
    },password:{
        type:Sequelize.STRING,
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },mobile:{
        type:Sequelize.STRING
    },pollString:{
        type:Sequelize.STRING(48),
        defaultValue : "000000000000000000000000000000000000000000000000"
    },score:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },matchesPlayed:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },winPercentage:{
        type:Sequelize.FLOAT,
        defaultValue:0.0
    }

});

module.exports = users;


