const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    assignTo: { type: String, required: true },
    assignBy: { type: String, required: true },
    status: { type: String, required: true },
    desc: { type: String, required: true },
    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sprint",
        required: true,
    },

}, { versionKey: false, timestamps: true })

const taskModel = mongoose.model("task", taskSchema)

module.exports = taskModel