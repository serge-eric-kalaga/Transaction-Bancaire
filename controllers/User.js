const Users = require("../models/User")

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
    }

}