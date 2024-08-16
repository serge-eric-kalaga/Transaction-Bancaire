const Users = require("../models/User")
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports =

{
    InitUser() {

        // user exist 
        const username = "serge";
        const userExist = Users.findOne({ username: username })

        if (!userExist) {
            console.log("========== Initialisation de l'utilisateur par defaut ==========");

            const user = Users.create({
                username: username,
                password: "1234",
                fullname: "Serge Eric Kalaga"
            })
            console.log("Initialisation de l'utilisateur par defaut ok !");
        }
    }
}