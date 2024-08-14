const express = require("express")

const userRouter = express.Router()

const {getAllUsers, createUser} = require("../controllers/User")

userRouter.get("/", getAllUsers)

userRouter.post("/register", createUser)

module.exports = userRouter;