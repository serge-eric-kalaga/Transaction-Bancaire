// Compte.controller.js
const { Compte, CreateCompteModel, UpdateCompteModel } = require("../models/Models");
const bcrypt = require("bcrypt");
const {genererNumeroCompte} = require("../utils/Fonctions");



module.exports = {

    async getAllComptes(req, res) {
        try {
            const comptes = await Compte.findAll({
                attributes: ["id", "nom_prenom", "date_naissance", "profession", "adresse", "telephone", "numero_compte", "solde"]
            });
            res.Response({ data: comptes })
        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    },

    async createCompte(req, res, next) {
        try {
            CreateCompteModel.validateAsync(req.body).then(async (value) => {
                const newCompte = await Compte.create({
                    nom_prenom: req.body.nom_prenom,
                    date_naissance: req.body.date_naissance,
                    profession: req.body.profession || null,
                    adresse: req.body.adresse || null,
                    telephone: req.body.telephone || null,
                    numero_compte: genererNumeroCompte(req.body.type_compte),
                    solde: req.body.solde || 0,
                })
                res.Response({ data: newCompte })
            }).catch(err => {
                next(err);
            })
        } catch (error) {
            next(err);
        }
    }, 

    async deleteCompte(req, res) {
        Compte.destroy({
            where: {
                id: req.params.id
            }
        }).then(async (value) => {
            if (value == 0) {
                res.status(404).Response({ message: "Compte not found !" })
            }
            else{
                res.Response({ message: "Compte deleted !" })
            }
        }).catch(error => {
            res.status(400).Response({ message: error.message })
        })
    },

    async updateCompte(req, res) {
        try {
            const compte = await Compte.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!compte) {
                res.status(404).Response({ message: "Compte not found !" })
            }
            else {
                UpdateCompteModel.validateAsync(req.body).then(async (value) => {
                    await compte.update(req.body)
                    await compte.save()
                    res.Response({ data: compte })
                })
            }
        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    },

    async getCompteByNumero(req, res) {
        try {
            const compte = await Compte.findOne({
                where: {
                    numero_compte: req.params.numero
                }
            })
            
            if (!compte) {
                res.status(404).Response({ message: "Compte not found !" })
            }
            else {
                res.Response({ data: compte })
            }
        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    },  

}