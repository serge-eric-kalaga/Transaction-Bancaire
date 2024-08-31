const express = require("express");

const { getAllComptes, createCompte, deleteCompte, getCompteById, getCompteByNumero, updateCompte } = require("../controllers/Compte.controller");

const compteRouter = express.Router();

compteRouter.get("/", getAllComptes);

// compteRouter.get("/:id", getCompteById);

compteRouter.get("/:numero", getCompteByNumero);

compteRouter.delete("/:id", deleteCompte);

// compteRouter.patch("/:id", updateCompte);

compteRouter.post("/", createCompte);

module.exports = compteRouter;