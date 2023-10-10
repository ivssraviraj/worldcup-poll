const {data} = require("../util/data");

const matches = require("../Models/Matches")



const push = ()=>{


    data.map(async d=>{
        await matches.create(d)
    })


}

push()
