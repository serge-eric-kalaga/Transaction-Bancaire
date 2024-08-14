const Tasks = require("../models/task");
const mongoose = require("mongoose")


module.exports = {
    async getAllTasks(req, res) {
        try {
            const tasks = await Tasks.find({});
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getTasksByID(req, res) {
        const taskID = req.params.id;
        try {
            if (!mongoose.Types.ObjectId.isValid(taskID)) {
                return res.status(400).json({ error: 'Invalid task ID' });
            }
            const task = await Tasks.findById(taskID);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            else {
                res.json(task);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createTask(req, res) {
        try {
            const newTask = new Tasks(req.body);
            await newTask.save();
            res.json(newTask);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateTask(req, res) {
        const taskID = req.params.id;
        try {
            if (!mongoose.Types.ObjectId.isValid(taskID)) {
                return res.status(400).json({ error: 'Invalid task ID' });
            }

            const task = Tasks.findOneAndUpdate({ _id: taskID }, req.body).then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Task not found.`
                    });
                } else {
                    res.json(data)
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteTask(req, res) {
        await Tasks.deleteOne({_id: req.params.id}).then(data => {
            if (data.deletedCount!=1) {
                res.status(404).send({
                    message: `Task not found.`
                });
            } else {
                res.send({message: "Task deleted successfully !"});
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    },

};
