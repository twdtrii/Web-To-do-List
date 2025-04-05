const models = require('../models/index');
const todo = models.data_todo;

const express = require('express');
const app = express();

app.get("/", async (req, res) => {
    await todo.findAll({
        attributes: ["id", "name", "status"]
    })
    .then(result => {
        res.json({
            data: result
        });
    })
    .catch(err => {
        console.log(err);
    });
});

app.post("/", async (req, res) => {
    const {
        name,
        status
    } = req.body;

    const data = {
        name: name,
        status: status
    };

    await todo.create(data)
    .then(result => {
        res.json({
            data: data
        });
    })
    .catch(err=> {
        console.log(err)
    })
});


module.exports = app;
