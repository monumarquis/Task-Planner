const express = require('express')
const { userPrivateRoute } = require('../middlewares/user.auth')
const app = express.Router()
const taskModel = require('../models/task.model')

// All Task of a user
app.get("/", userPrivateRoute, async (req, res) => {
    console.log(req.body.user);
    const myTask = await taskModel.find({ assignBy: req.body.user.email });
    const assignedtask = await taskModel.find({ assignTo: req.body.user.email });
    return res.status(201).send({ myTask, assignedtask })
})
app.get("/allSprint", userPrivateRoute, async (req, res) => {
    console.log(req.body.user);
    const myTask = await taskModel.find();

    return res.status(201).send(myTask)
})


app.post("/", userPrivateRoute, async (req, res) => {
    // console.log(req.body.user);
    const { email: assignBy } = req.body.user
    const { title, assignTo, desc, status, sprint } = req.body
    console.log({ title, assignTo, desc, status, sprint, assignBy });
    if (!status || !title || !assignTo || !desc || !sprint) return res.status(403).send({ message: "Please Enter All Details" })

    const exsist = await taskModel.findOne({ title })
    if (exsist) return res.status(404).send({ message: "title already taken" })

    const task = await taskModel({ title, status, desc, assignBy, assignTo, sprint });
    task.save()

    return res.status(201).send({ message: "task assigned successfully" });

})
module.exports = app