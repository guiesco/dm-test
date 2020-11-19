require('dotenv').config()
const express = require('express');

const app = express()
app.use(express.json())

app.use('', require('./src/routes'))

const server = app.listen(3001)

module.exports = server;