const bcrypt = require("bcrypt");
const User = require("../Models/Users")
const jwt = require("jsonwebtoken")

module.exports.loginController = async (req,res,next)=>{


// todo change the query
    const user = await User.findOne({where:{"email":req.body.email}})

    if(!user || user.email!==req.body.email)
        return  res.sendStatus(404)

    console.log(user.dataValues);

    const  isMatch = await bcrypt.compare(req.body.password, user.dataValues.password)



    if(isMatch) {
        // now create a jwt token
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        const token = jwt.sign(data, process.env.SECRET_KEY)
        return res.json({token: token, userId:user.id,userName:user.userName})
    }
    else
        res.sendStatus(404)

}


module.exports.authenticateToken =  (req,res,next)=>{
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]

    console.log(token);
    if(token===null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_KEY,(err,user)=>{
        //console.log(user);

        if(err)return res.sendStatus(403)



        req.user = user

        next()
    })


}




module.exports.signUpController = async (req,res,next)=>{


// validate the fields and enter it into DB

// create a token and send it as response

    console.log(process.env.SECRET_KEY);

    const salt = bcrypt.genSaltSync(10)

    req.body.password = await bcrypt.hash(req.body.password, salt)


    const user =await User.create(req.body);

    const token = jwt.sign(req.body, process.env.SECRET_KEY)

    res.json({token:token, userId:user.dataValues.id,userName:user.dataValues.userName})


}
