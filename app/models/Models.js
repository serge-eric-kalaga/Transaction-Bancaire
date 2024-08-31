const User = require("./User.model");
const Compte = require("./Compte.model");
const Transaction = require("./Transaction.model");


Compte.hasMany(Transaction, { foreignKey: "compte_id" });
Transaction.belongsTo(Compte);


module.exports = { User, Compte, Transaction };