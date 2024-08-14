const express = require("express");
const { connection } = require("mongoose");
const { connect_db } = require("./configs/database");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;


const {getAllTasks, getTasksByID, createTask, updateTask, deleteTask} = require("./controllers/tasks")


app.get("/", (req, res, next) => {
    console.log(req.headers)
    res.json({
        succes: true
    });
})


app.get("/tasks", getAllTasks);

app.get("/tasks/:id", getTasksByID);

app.patch("/tasks/:id", updateTask);

app.delete("/tasks/:id", deleteTask);

app.post("/tasks", createTask);


app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on http://localhost:${PORT}`);
    connect_db();
})

