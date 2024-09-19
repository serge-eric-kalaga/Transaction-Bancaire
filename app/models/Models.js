const { User, CreateUserModel, UpdateUserModel } = require("./User.model");
const { Compte, CreateCompteModel, UpdateCompteModel } = require("./Compte.model");
const { Transaction, CreateTransactionModel } = require("./Transaction.model");
const { DB, connect_db } = require("../configs/Database");

Compte.hasMany(Transaction, { onDelete: "CASCADE" });
Transaction.belongsTo(Compte);

// DB.sync({ force: true });

module.exports = {
  User,
  Compte,
  Transaction,
  CreateUserModel,
  UpdateUserModel,
  CreateCompteModel,
  UpdateCompteModel,
  CreateTransactionModel,
};
