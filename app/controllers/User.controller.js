const User = require("../models/User.model")
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt")

module.exports = {

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.Response({ data: users })
        } catch (error) {
            res.Response({ message: error.message })
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create({
                nom_prenom: req.body.nom_prenom,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.UserPasswordSaltRound))
            })
            res.Response({ message: newUser })
        } catch (error) {
            res.Response({ message: error.message })
        }
    },

    async loginUser(req, res) {
        try {
            const user_exist = await Users.findOne({ username: req.body.username });

            if (!user_exist) {
                res.status(401).Response({ message: "Username or password incorrect !" })
            }
            else {

                const checkPassword = bcrypt.compareSync(req.body.password, user_exist.password)

                if (!checkPassword) {
                    res.status(401).Response({ message: "Username or password incorrect !" })
                }
                else {
                    const token = jsonwebtoken.sign({
                        _id: user_exist._id,
                        username: user_exist.username,
                        fullname: user_exist.fullname
                    }, process.env.JWTKey, { expiresIn: 3600 });

                    // res.send(checkPassword)
                    res.Response({
                        data: {
                            username: user_exist.username,
                            fullname: user_exist.fullname,
                            token: token
                        }
                    })

                }

            }

        } catch (error) {
            res.Response({ message: error.message })
        }
    }

}