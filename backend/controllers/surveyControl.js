const Survey = require('../models/Survey')
const mongoose = require('mongoose')

// get all surveys
const getAllSurvey =  async (req, res) => {
    const survey = await Survey.find({}).sort({createdAt: -1})
    res.status(200).json(survey)
  }
  
// get a single survey


// create a new survey
const createSurvey = async (req, res) => {
    const { question, options, responses } = req.body
   // add to the database
    try {
      const survey = await Survey.create({question, options, responses})
      res.status(200).json(survey)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

//delete a survey


//update a survey

module.exports = {
    createSurvey,
}