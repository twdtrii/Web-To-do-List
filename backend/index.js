const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(express())
app.use(bodyParser.json())
app.use(cors())

const Todo = require("./api/controller");
app.use('/api/todo', Todo);

app.listen(8080, (()=> console.log("server run on port 8080")))