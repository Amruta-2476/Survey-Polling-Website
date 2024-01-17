require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const surveyRoutes = require('./routes/survey')

const mongoUri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.m2hopr5.mongodb.net/?retryWrites=true&w=majority` 

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
app.use('/api/survey', surveyRoutes)

// connect to db
mongoose.connect(mongoUri)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 


