const { User, CreateUserModel, UpdateUserModel } = require("./User.model");
const { Compte, CreateCompteModel, UpdateCompteModel } = require("./Compte.model");
const { Transaction, CreateTransactionModel } = require("./Transaction.model");

Compte.hasMany(Transaction, { onDelete: "CASCADE" });
Transaction.belongsTo(Compte);

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
