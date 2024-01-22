// app.use('/api/survey/response', surveyResRoutes)

// surveyResRoutes.js
import bodyParse from 'bo'
const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');

// POST /api/survey/response
router.post('/', (req, res) => {
    try {
        // Handle the survey response here
        const { surveyId, responses } = req.body;

        // Process the survey response data as needed
        // ...

        // Respond with a success message
        res.status(200).json({ message: 'Survey response submitted successfully' });
    } catch (error) {
        console.error('Error handling survey response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
