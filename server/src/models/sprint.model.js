const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    desc: { type: String, required: true },
    creatorName: { type: String, required: true },
    creatorEmail: { type: String, required: true },

}, { versionKey: false, timestamps: true })

const sprintModel = mongoose.model("sprint", sprintSchema)

module.exports = sprintModel