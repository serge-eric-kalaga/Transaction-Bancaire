const mongose = require("mongoose")
const bcrypt = require("bcrypt")

const saltRound = parseInt(process.env.UserPasswordSaltRound);

function hashPassword(password){
    return bcrypt.hashSync(password, saltRound);
}

const UserModel = mongose.Schema({
    username: {type: String, required: true, minLength:3, maxLength: 100, unique:true, index: true, trim: true},
    password: {
        type: String, required: true, minLength:4, maxLength: 255,
        set: hashPassword
    },
    fullname: {type: String, required: false, default:null, minLength:3, maxLength: 255, trim: true},  
})


// UserModel.methods.checkPassword  = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }


module.exports = mongose.model("Users", UserModel);