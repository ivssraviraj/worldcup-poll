
const Users = require("../Models/Users")
const Matches = require("../Models/Matches")


module.exports.leaderBoardController = async (req,res,next)=>{


 // fetch and return all the peoples leaderboard status, this will be same for all the users.

    const users = await Users.findAll({
       order:[
           ['score','DESC']
       ]
    })



    const result = users.map((el,i)=>{

        return {
            id:el.id,
            score:el.score,
            userName:el.userName,
            matchesPlayed : el.matchesPlayed,
            winPercentage : el.winPercentage,
            rank : i+1
        }
    })



    res.json(result)






}

module.exports.getPollsController = async(req,res,next)=>{

    // here i need to segregate into upcoming and completed as i cant rely on client date

    const matches  = await Matches.findAll();

    const date = new Date();
    const completed = matches.filter(d => date>d.dataValues.date)


    console.log(completed);
    res.sendStatus(200)

    // res.json(matches)


}




function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}


module.exports.submitPollsController = async (req,res,next)=>{

    // here i get userid, and the meta data of the match.

    // first get the poll string of the user.

    /**
     * Actually the validation to wether the poll can be considered or not should be done in the server, not on the client
     * as client can simply change their date and time and re-do their polling.
     */


    /**
     *
     * from the user i get,
     * match end date & time along with the time at which the request reached the server.
     */


    /**
     *
     * {
     *     matchId:xx,
     *     userId:xx,
     *     Date : endDate of the match
     *     userChoice : 1 => home team, 2=>away team, 3=> ( i get either 1,2,or 3)
     * }
     */

    console.log(req.body);

    const userDate = new Date();
    const matchDate = new Date(req.body.date)

    if(userDate<=matchDate){

        try{
            const user = await Users.findOne({where:{id:req.body.userId}})

            let pollString = user.dataValues.pollString

            pollString = setCharAt(pollString,req.body.matchId-1,req.body.choice );


            console.log(pollString);

            await Users.update({pollString: pollString},{where:{
                    id:req.body.userId
                }})

            res.sendStatus(200)




        }catch (e){
            console.log(e);
            res.sendStatus(500)
        }


    }else{

        // user trying to perform an invalid operation
        res.sendStatus(406)
    }



}


module.exports.updateProfile = async (req,res,next)=>{


}




