const express = require("express");

const { getAllTransactions, createTransaction, deleteTransaction, getCompteTransactionsByNumero } = require("../controllers/Transaction.controller");

const transactionRouter = express.Router();

transactionRouter.get("/", getAllTransactions);

transactionRouter.post("/", createTransaction);

transactionRouter.delete("/:id", deleteTransaction);

transactionRouter.get("/:numero_compte", getCompteTransactionsByNumero);

module.exports = transactionRouter;