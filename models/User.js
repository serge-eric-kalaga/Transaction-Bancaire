const mongose = require("mongoose")

const UserModel = mongose.Schema({
    username: {type: String, required: true, minLength:3, maxLength: 50},
    password: {type: String, required: true, minLength:3, maxLength: 50},
    fullname: {type: String, required: false, default:null, minLength:3, maxLength: 100},  
})


module.exports = mongose.model("Users", UserModel);