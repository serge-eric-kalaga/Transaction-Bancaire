const { Sequelize, DataTypes, Model } = require("sequelize");
const Joi = require("joi");
const { DB } = require("../configs/Database");


const Compte = DB.define(
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
            allowNull: true,
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
            type: DataTypes.STRING,
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
    type_compte: Joi.number().required().min(1).max(2),
    nom_prenom: Joi.string().required().min(3).max(200),
    date_naissance: Joi.date(),
    profession: Joi.string().min(3).max(200),
    adresse: Joi.string().min(3).max(200),
    telephone: Joi.string().required().min(3).max(200),
    solde: Joi.number().min(0),
});

const UpdateCompteModel = Joi.object({
    nom_prenom: Joi.string().min(3).max(200),
    date_naissance: Joi.date().required(),
    profession: Joi.string().min(3).max(200),
    adresse: Joi.string().min(3).max(200),
    telephone: Joi.string().min(3).max(200),
    solde: Joi.number().min(0),
})

module.exports = { Compte, CreateCompteModel, UpdateCompteModel };