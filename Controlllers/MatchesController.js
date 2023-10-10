const bcrypt = require("bcrypt");
const matches = require("../Models/Matches")
const {Op} = require("sequelize");
const Users = require("../Models/Users")

module.exports.updateMatchResult = async (req,res,next)=>{





    try{
    /**
     *   req : {
     *
     *       winner : Integer
     *
     *       winner 1=> home team
     *       winner 2 => away team
     *   }
     */


    const data = req.body

        console.log(data);

        const match = await matches.findOne({where:{id:data.id}})

        req.body = {... req.body, ...match.dataValues}

        console.log(req.body);


        let winner = data.winner===1? req.body.homeTeam:data.winner===2?req.body.awayTeam:"None"

        console.log(winner);

        const d =  await matches.update({"winner":winner}, {
        where: {
            id: req.body.id
        }
    })

        console.log(d);


        // now proceed to calculate score and rank for every user.

    let users = await Users.findAll({})



    // using matchid check if the poll string index matches the winner number if yes, increase the rank

    /**
     * To check
     * 1. wether the user played the match or not => pollString index 0 => didnt play
     * 2. Wether he won or not
     */

    const matchNumber = data.id
    let temp = users.map(d=>{
        d = d.dataValues
        if(parseInt(d.pollString.charAt(matchNumber-1)) !== 0) {
            // user submitted a poll
            d.matchesPlayed+=1
        }

        if(parseInt(d.pollString.charAt(matchNumber-1)) === data.winner){
            // increment the rank
            d.score+=1

            d.winPercentage = d.score/d.matchesPlayed

        }
        return d
    })

        await Promise.all(temp.map( async el =>{
        await Users.update({"score":temp[0].score, "matchesPlayed":temp[0].matchesPlayed, "winPercentage":temp[0].winPercentage}, {where:{
                        id:temp[0].id
                    }} )

        }))



    res.sendStatus(200)
}
    catch(e){
        console.log(e);
        res.sendStatus(500)

    }


}


module.exports.upcomingMatchController = async (req,res,next)=>{

    const d = new Date()

    const data = await matches.findAll({where:{
        date:{
            [Op.gt] : d
        },
        }, order:[
            ['id','ASC']
        ],limit:6})

    const d1 = data.map(e => {
       e = e.dataValues
        e.pollable = true
        return e
    })

    res.json(d1)


}


module.exports.allMatchController = async (req,res,next)=>{



    const data = await matches.findAll({order:[
            ['id','ASC']
        ]})

    let d1 = data.map(e => e.dataValues)

    let date = new Date()
    d1 = d1.map(e =>{
        if(e.date>date){
            e.pollable = true
        }else
            e.pollable=false

        return e
    })



    res.json(d1)


}
