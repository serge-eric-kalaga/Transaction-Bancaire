const Tasks = require("../models/Task");
const mongoose = require("mongoose")


module.exports = {

    async getAllTasks(req, res) {
        try {
            const tasks = await Tasks.find({});
            res.Response({data: tasks});
        } catch (error) {
            res.status(500).Response({ message: error.message });
        }
    },

    async getTasksByID(req, res) {
        const taskID = req.params.id;
        try {
            if (!mongoose.Types.ObjectId.isValid(taskID)) {
                return res.status(400).Response({message: 'Invalid task ID'});
            }
            const task = await Tasks.findById(taskID);
            if (!task) {
                return res.status(404).Response({message: `Task not found.`});
            }
            else {
                res.Response(task);
            }
        } catch (error) {
            res.status(500).Response({ message: error.message });
        }
    },

    async createTask(req, res) {
        try {
            const newTask = new Tasks(req.body);
            await newTask.save();
            res.Response({data: newTask});
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },

    async updateTask(req, res) {
        const taskID = req.params.id;
        try {
            if (!mongoose.Types.ObjectId.isValid(taskID)) {
                return res.status(400).Response({ message: 'Invalid task ID' });
            }

            const task = Tasks.findOneAndUpdate({ _id: taskID }, req.body).then(data => {
                if (!data) {
                    res.status(404).Response({message: `Task not found.`});
                } else {
                    res.Response({"data": data})
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteTask(req, res) {
        await Tasks.deleteOne({_id: req.params.id}).then(data => {
            if (data.deletedCount!=1) {
                res.status(404).Response({message:`Task not found.`});
            } else {
                res.Response({message: "Task deleted successfully !"});
            }
        }).catch(err => {
            res.status(500).Response({
                message: err.message
            });
        });
    },

};
