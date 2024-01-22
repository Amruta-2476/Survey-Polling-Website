const Survey = require('../models/Survey')
const mongoose = require('mongoose')
const SurveyResponse = require('../models/surveyResModel');

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
  try {
    const { title, questions } = req.body;
    // const user = req.user;

    let emptyFields = []
    if (!title) {
      emptyFields.push('title')
    }
    if (!questions) {
      emptyFields.push('questions')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // Create an array to store processed questions
    const processedQuestions = [];

    // Iterate through each question in the request body
    for (const { questionText, options } of questions) {
      const processedQuestion = {
        questionText,
        options,
        responses: [], // Initialize responses as an empty array for each question
      };
      processedQuestions.push(processedQuestion);
    }

     // Ensure that a user is logged in before creating the survey
     if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized. User not logged in.' });
    }

    // Create the survey with the processed questions
    const survey = await Survey.create({
      title,
      questions: processedQuestions,
      user: req.user._id
    });

    res.status(200).json(survey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


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
  
// POST a new survey response
const surveyResponse = async (req, res) => {
  try {
      const { id } = req.params;
      const { selectedOptions } = req.body;
      // Validate if the survey exists
      const survey = await Survey.findById(id);
      if (!survey) {
          return res.status(404).json({ error: 'No such survey' });
      }
      // Validate if the user has already responded to the survey
      const existingResponse = await SurveyResponse.findOne({
          user: req.user._id,
          survey: id,
      });
      if (existingResponse) {
          return res.status(400).json({ error: 'You have already responded to this survey' });
      }
      // Validate if the selectedOptions array has the correct length
      if (selectedOptions.length !== survey.questions.length) {
          return res.status(400).json({ error: 'Invalid number of responses' });
      }
      // Create a new survey response
      const newResponse = new SurveyResponse({
          user: req.user._id,
          survey: id,
          responses: selectedOptions.map((selectedOption, index) => ({
              questionIndex: index,
              selectedOption,
          })),
      });
      // Save the response to the database
      await newResponse.save();
      res.status(201).json({ message: 'Survey response submitted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

module.exports = {
    getAllSurvey,
    getOneSurvey,
    createSurvey,
    deleteSurvey,
  updateSurvey,
  surveyResponse
}