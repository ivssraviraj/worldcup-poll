const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require("dotenv").config();


const matchesRoute = require('./routes/matches')
const userRoute = require('./routes/User')
const auth = require('./routes/auth')

const app = express();
app.use(cors());



let SERVER_PORT = 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = require('./util/database')



app.use(userRoute)
app.use(matchesRoute)
app.use(auth)



const matches = require("./Models/Matches")
const users = require("./Models/Matches")
const {data} = require("./util/data");

sequelize.sync().then(result=>{
    //console.log("sql synced");
    if (result) {

        console.log("Database connected");
        console.log(`server started on ${SERVER_PORT} `);
        app.listen(SERVER_PORT);

        const {data} = require("./util/data");


        const push = ()=>{


            data.map(async d=>{
                await matches.create({
                    id : d.MatchNumber,
                    date : d.DateUtc,
                    location:d.Location,
                    homeTeam:d.HomeTeam,
                    awayTeam:d.AwayTeam,
                    winner : d.winner

                })
            })


        }

        //push()
    } else {
        console.log("failed to connect db ");
        console.log(result);
    }

}).catch(err=>{
    console.log(err);
    console.log("error syncing sql");
});



module.exports = app;
