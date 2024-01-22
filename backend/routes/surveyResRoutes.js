// app.use('/api/survey/response', surveyResRoutes)

const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const mongoose = require('mongoose');
const Survey = require('../models/Survey');
const SurveyResponse = require('../models/surveyResModel'); // Import your SurveyResponse model

const router = express.Router();
router.use(requireAuth); // Require authentication for all survey response routes

// POST a new survey response
router.post('/:id', async (req, res) => {
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
});

module.exports = router;

