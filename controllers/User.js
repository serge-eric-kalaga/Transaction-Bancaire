const Users = require("../models/User")
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt")

module.exports = {

    async getAllUsers(req, res){
        try {
            const users = await Users.find({})
            res.json(users)
        } catch (error) {
            res.send(error.message)
        }
    },

    async createUser(req, res){
        try {
            const newUser = new Users(req.body)
            await newUser.save()
            res.json(newUser)
        } catch (error) {
            res.send(error)
        }
    },

    async loginUser(req, res){
        try {
            const user_exist = await Users.findOne({username: req.body.username});
            const checkPassword = bcrypt.compareSync(req.body.password, user_exist.password)

            if(!user_exist || !checkPassword){
                res.status(401).json({message: "Username or password incorrect !"})
            }
            else{
                const token = jsonwebtoken.sign({
                    username: user_exist.username,
                    fullname: user_exist.fullname
                }, process.env.JWTKey);
                
                // res.send(checkPassword)
                res.json({
                    username: user_exist.username,
                    fullname: user_exist.fullname,
                    token: token 
                })
            }

        } catch (error) {
            res.send(error)
        }
    }

}