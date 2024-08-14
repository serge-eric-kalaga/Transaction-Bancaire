const express = require("express");
const { connection } = require("mongoose");
const { connect_db } = require("./configs/Database");

const taskRouter = require("./routes/Task")
const userRouter = require("./routes/User")

const LoginRequired = require("./middlewares/Auth")
const loggerMiddleware = require("./middlewares/Logger")

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(loggerMiddleware)

const PORT = process.env.PORT ;

// app.use(LoginRequired)


app.get("/", (req, res, next) => {
    console.log(req.headers)
    res.json({
        succes: true
    });
})


app.use("/tasks", LoginRequired, taskRouter)
app.use("/users", userRouter)


app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on http://localhost:${PORT}`);
    connect_db();
})

