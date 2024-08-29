const Users = require("../models/User.model")
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports =

{
    async InitUser() {

        console.log("========== Initialisation de l'utilisateur par defaut ==========");
        // user exist 
        const username = "serge";
        const userExist = Users.findOne({ username: username }).exec();
        
        if (!userExist) {

            const user = new Users({
                username: username,
                password: "1234567890",
                fullname: "Serge Eric Kalaga"
            })
            await user.save()
            console.log("Initialisation de l'utilisateur par defaut ok !");
        }
        else{
            console.log("=================> Default User Already Exist ! <=================");
        }
    }
}