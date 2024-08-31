const { Sequelize, DataTypes, Model } = require("sequelize");
const Joi = require("joi");
const { DB } = require("../configs/Database");


DB.define(
    "Transaction",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
        montant: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
);

const CreateTransactionModel = Joi.object({
    date: Joi.date().required(),
    montant: Joi.number().required().min(3).max(200),
    type: Joi.string().required().min(3).max(200),
    description: Joi.string().required().min(3).max(200),
    compte_id: Joi.number().required().min(3).max(200),
}); 

module.exports = { Transaction, CreateTransactionModel };