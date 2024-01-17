const express = require('express')
const {
  createSurvey,
} = require('../controllers/surveyControl')


const router = express.Router()

// GET all surveys
router.get('/', (req, res) => {
    res.json({mssg: 'GET all surveys'})
})

// GET a single survey
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single survey'})
  })

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