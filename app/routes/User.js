const express = require("express")

const userRouter = express.Router()

const {getAllUsers, createUser, loginUser} = require("../controllers/User")

userRouter.get("/", getAllUsers)

userRouter.post("/register", createUser)

userRouter.post("/login", loginUser)

module.exports = userRouter;