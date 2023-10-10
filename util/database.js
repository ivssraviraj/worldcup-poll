
const Sequelize = require('sequelize');

const seq = new Sequelize('postgres','postgres','rootroot',
    {dialect:'postgres',host:'polldb.crenldggkc0j.us-east-1.rds.amazonaws.com',dialectOptions: {
            ssl: {
                require: true, // This will help you. But you will see nwe error
                rejectUnauthorized: false // This line will fix new error
            }}});
module.exports = seq;
