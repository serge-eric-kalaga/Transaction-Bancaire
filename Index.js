const express = require("express");
const { connection } = require("mongoose");
const { connect_db } = require("./configs/Database");

const taskRouter = require("./routes/Task")
const userRouter = require("./routes/User")

require('dotenv').config()

const app = express();

app.use(express.json());

const PORT = process.env.PORT ;




app.get("/", (req, res, next) => {
    console.log(req.headers)
    res.json({
        succes: true
    });
})


app.use("/tasks", taskRouter)
app.use("/users", userRouter)


app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on http://localhost:${PORT}`);
    connect_db();
})

