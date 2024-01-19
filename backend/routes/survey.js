const express = require('express')
const {
  createSurvey,
  getAllSurvey,
  getOneSurvey,
  deleteSurvey,
  updateSurvey
} = require('../controllers/surveyControl')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
// require auth for all survey routes
router.use(requireAuth)

// GET all surveys
router.get('/', getAllSurvey)

// GET a single survey
router.get('/:id', getOneSurvey)

// POST a new survey
router.post('/', createSurvey)
  
// DELETE a survey
router.delete('/:id', deleteSurvey)
  
// UPDATE a survey
router.patch('/:id', updateSurvey)
module.exports = router