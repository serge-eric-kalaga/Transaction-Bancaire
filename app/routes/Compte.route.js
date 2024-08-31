const express = require("express");

const { getAllComptes, createCompte, deleteCompte, getCompteById, getCompteByNumero, updateCompte } = require("../controllers/Compte.controller");

const compteRouter = express.Router();

compteRouter.get("/", getAllComptes);


compteRouter.get("/:numero_compte", getCompteByNumero);

compteRouter.delete("/:numero_compte", deleteCompte);

compteRouter.patch("/:numero_compte", updateCompte);

compteRouter.post("/", createCompte);

module.exports = compteRouter;