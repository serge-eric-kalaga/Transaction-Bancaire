const mongoose = require("mongoose")

const TaskModel = mongoose.Schema({
    name: {type: String, required: true, trim: true, minLength: 3, maxLength: 50},
    description: {type: String, default: null, null: true},
    status: {type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Tasks", TaskModel);