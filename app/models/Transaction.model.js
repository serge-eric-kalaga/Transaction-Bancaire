const { Sequelize, DataTypes, Model } = require("sequelize");
const Joi = require("joi");
const { DB } = require("../configs/Database");


const Transaction = DB.define(
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
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    date: Joi.date(),
    montant: Joi.number().required().min(500),
    type: Joi.number().required().min(1).max(2),
    description: Joi.string().required().min(3).max(200),
    numero_compte: Joi.string().required().min(13).max(13),
}); 

module.exports = { Transaction, CreateTransactionModel };