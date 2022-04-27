const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./controller')

const session = require('express-session')
const app = express()

app.use(
  session({
    secret            : 'FE#5-GE',
    resave            : true,
    saveUninitialized : true,
  })
)

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

//Routing
routes.map(route => app.use(route))

// server start
module.exports = app
