const express = require('express')
const { userPrivateRoute, adminPrivateRoute } = require('../middlewares/user.auth')
const app = express.Router()
const sprintModel = require('../models/sprint.model')
const taskModel = require('../models/task.model')


// All Sprints 
app.get("/", userPrivateRoute, async (req, res) => {
    const sprint = await sprintModel.find();
    return res.status(201).send(sprint)
})

// Single sprint Route
app.get("/:id", userPrivateRoute, async (req, res) => {
    const { id } = req.params
    const sprint = await sprintModel.find({ _id: id });
    return res.status(201).send(sprint)
})

// Delete Sprint Route
app.delete('/:id', adminPrivateRoute, async (req, res) => {
    let { id } = req.params
    console.log(id);

    try {
        let doc = await sprintModel.deleteOne({ _id: id })
        let doc2 = await taskModel.deleteMany({ sprint: id })
        return res.status(201).send({ doc, doc2, message: "Your Sprint Deleted Successfully" });
    } catch (error) {
        return res.status(401).send(error);
    }
})

// Add Sprint Route
app.post("/", userPrivateRoute, async (req, res) => {
    console.log(req.body.user);

    const { name: creatorName, email: creatorEmail } = req.body.user
    const { title, startDate, endDate, desc } = req.body
    if (!title || !startDate || !endDate || !desc) return res.status(403).send({ message: "Please Enter All Details" })

    const exsist = await sprintModel.findOne({ title })
    if (exsist) return res.status(404).send({ message: "title already taken" })

    const sprint = await sprintModel({ title, startDate, endDate, desc, creatorName, creatorEmail });
    sprint.save()

    return res.status(201).send({ message: "sprint added successfully" });

})

module.exports = app