const Users = require("../models/User")
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt")

module.exports = {

    async getAllUsers(req, res){
        try {
            const users = await Users.find({})
            res.Response({data: users})
        } catch (error) {
            res.Response({message: error.message})
        }
    },

    async createUser(req, res){
        try {
            const newUser = new Users(req.body)
            await newUser.save()
            res.Response({message: newUser})
        } catch (error) {
            res.Response({message: error.message})
        }
    },

    async loginUser(req, res){
        try {
            const user_exist = await Users.findOne({username: req.body.username});
            const checkPassword = bcrypt.compareSync(req.body.password, user_exist.password)

            if(!user_exist || !checkPassword){
                res.status(401).Response({message: "Username or password incorrect !"})
            }
            else{
                const token = jsonwebtoken.sign({
                    _id: user_exist._id,
                    username: user_exist.username,
                    fullname: user_exist.fullname
                }, process.env.JWTKey, {expiresIn: 3600});
                
                // res.send(checkPassword)
                res.Response({data: {
                    username: user_exist.username,
                    fullname: user_exist.fullname,
                    token: token 
                }})
            }

        } catch (error) {
            res.Response({message: error.message})
        }
    }

}