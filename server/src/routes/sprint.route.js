const express = require('express')
const { userPrivateRoute } = require('../middlewares/user.auth')
const app = express.Router()
const sprintModel = require('../models/sprint.model')

app.get("/", userPrivateRoute, async (req, res) => {
    console.log(req.body);
})

module.exports = app