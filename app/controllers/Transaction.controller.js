// Transaction.controller.js
const { Transaction, CreateTransactionModel, Compte } = require("../models/Models");
const {genererNumeroCompte, getTypeTransaction} = require("../utils/Fonctions");


module.exports = {

    async getAllTransactions(req, res) {
        try {
            const transactions = await Transaction.findAll({
                attributes: ["id", "date", "montant", "type", "description", "CompteId"]
            });
            res.Response({ data: transactions })
        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    },

    async createTransaction(req, res, next) {
        try {
            CreateTransactionModel.validateAsync(req.body).then(async (value) => {

                const compte = await Compte.findOne({
                    where: {
                        numero_compte: req.body.numero_compte
                    }
                })
                if (!compte) {
                    res.status(404).Response({ message: "Compte not found !" })
                }
                else {

                    if(req.body.type === 2 && compte.solde < req.body.montant) {
                        res.status(400).Response({ message: "Solde insuffisant !" })
                    }
                    else{
                        const newTransaction = await Transaction.create({
                            date: req.body.date || new Date(),
                            montant: req.body.montant,
                            type: getTypeTransaction(req.body.type),
                            description: req.body.description || null,
                            CompteId: compte.id,
                        })

                        if (req.body.type === 1) {
                            compte.solde += req.body.montant;
                        }
                        else if (req.body.type === 2) {
                            compte.solde -= req.body.montant;
                        }

                        await compte.save();
                        res.Response({ data: newTransaction })
                    }
                }

            }).catch(err => {
                next(err);
            })
        } catch (error) {
            next(err);
        }
    },

    async deleteTransaction(req, res) {
        Transaction.destroy({
            where: {
                id: req.params.id
            }
        }).then(async (value) => {
            if (value == 0) {
                res.status(404).Response({ message: "Transaction not found !" })
            }
            else{
                res.Response({ message: "Transaction deleted !" })
            }
        }).catch(error => {
            res.status(400).Response({ message: error.message })
        })
    },

    async getCompteTransactionsByNumero(req, res) {
        try {
            const transactions = await Compte.findOne({
                where: {
                    numero_compte: req.params.numero_compte
                },
                include: Transaction
            }).then(async (value) => {
                if (!value) {
                    res.status(404).Response({ message: "Compte not found !" })
                }
                else {
                    const transactions = await Transaction.findAll({
                        where: {
                            CompteId: value.id
                        }
                    })
                    res.Response({ data: transactions })
                }
            })
        } catch (error) {
            res.status(400).Response({ message: error.message })
        }
    }

}