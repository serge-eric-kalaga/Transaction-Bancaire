const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;


let tasks = [
    {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        completed: false
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        completed: false
    },
    {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        completed: false
    }
];



app.get("/", (req, res, next) => {
    console.log(req.headers)
    res.json({
        succes: true
    });
})


app.get("/tasks", (req, res, next) => {
    res.jsonp(tasks);
})


app.get("/tasks/:id", (req, res, next) => {
    const id = req.params['id'];

    const task_exist = tasks.find(task => task['id'] == id);

    if (task_exist == null) {
        res.status(404).send("Task not found !");
    }
    res.json(task_exist);
})


app.post("/tasks", (req, res, next) => {
    const new_task = req.body
    tasks = [...tasks, new_task];
    // tasks.push(new_task)

    res.json(tasks);
})


app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on http://localhost:${PORT}`);
})

