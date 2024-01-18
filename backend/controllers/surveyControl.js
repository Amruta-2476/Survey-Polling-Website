const Survey = require('../models/Survey')
const mongoose = require('mongoose')

// get all surveys
const getAllSurvey =  async (req, res) => {
    const survey = await Survey.find({}).sort({createdAt: -1})
    res.status(200).json(survey)
  }
  
// get a single survey
const getOneSurvey = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such survey'})
      }
    
      const survey = await Survey.findById(id)
    
      if (!survey) {
        return res.status(404).json({error: 'No such survey'})
      }
      res.status(200).json(survey)
}

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
const deleteSurvey = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such survey'})
    }
    const survey = await Survey.findOneAndDelete({ _id: id })
    if (!survey) {
        return res.status(404).json({error: 'No such survey'})
    }
    res.status(200).json(survey)
}

//update a survey
const updateSurvey = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such survey'})
    }
    const survey = await Survey.findOneAndUpdate({_id: id}, {
      ...req.body
    })
    if (!survey) {
      return res.status(400).json({error: 'No such survey'})
    }
    res.status(200).json(survey)
  }

module.exports = {
    getAllSurvey,
    getOneSurvey,
    createSurvey,
    deleteSurvey,
    updateSurvey
}