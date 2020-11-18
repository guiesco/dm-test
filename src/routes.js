const express = require('express')
const routes = express.Router()

const controller = require('./controller')

routes.get('/recipes/:i', controller.getRecipes)

module.exports = routes