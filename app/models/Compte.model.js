const { Sequelize, DataTypes, Model } = require("sequelize");
const Joi = require("joi");
const { DB } = require("../configs/Database");


DB.define(
    "Compte",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        nom_prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_naissance: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        numero_compte: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        solde: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }
);


const CreateCompteModel = Joi.object({
    nom_prenom: Joi.string().required().min(3).max(200),
    date_naissance: Joi.date().required(),
    profession: Joi.string().required().min(3).max(200),
    adresse: Joi.string().required().min(3).max(200),
    telephone: Joi.string().required().min(3).max(200),
    numero_compte: Joi.number().required().min(3).max(200),
});

module.exports = { Compte, CreateCompteModel };