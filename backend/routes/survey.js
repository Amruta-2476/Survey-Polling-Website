const express = require('express')
const {
  createSurvey,
  getAllSurvey,
  getOneSurvey,
} = require('../controllers/surveyControl')


const router = express.Router()

// GET all surveys
router.get('/', getAllSurvey)

// GET a single survey
router.get('/:id', getOneSurvey)

// POST a new survey
router.post('/', createSurvey)
  
// DELETE a survey
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a survey'})
})
  
// UPDATE a survey
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a survey'})
  })
module.exports = router