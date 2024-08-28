const express = require("express");
const taskRouter = express.Router()

const { getAllTasks, getTasksByID, updateTask, deleteTask, createTask } = require("../controllers/Task");

// const LoginRequired = require("../middlewares/Auth")

taskRouter.get("/",   getAllTasks);
// taskRouter.get("/", LoginRequired,  getAllTasks);

taskRouter.get("/:id", getTasksByID);

taskRouter.patch("/:id", updateTask);

taskRouter.delete("/:id", deleteTask);

taskRouter.post("/", createTask);


module.exports = taskRouter;