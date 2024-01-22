const Poll = require('../models/PollModel')
const mongoose = require('mongoose')

// get all poll
const getAllPoll =  async (req, res) => {
    const poll = await Poll.find({}).sort({createdAt: -1})
    res.status(200).json(poll)
}
  
// get a single poll
const getOnePoll = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such poll'})
      }
    
      const poll = await Poll.findById(id)
    
      if (!poll) {
        return res.status(404).json({error: 'No such poll'})
      }
      res.status(200).json(poll)
}

// create a new poll
const createPoll = async (req, res) => {
    try {
      const { title, question, options } = req.body;
  
      let emptyFields = []
      if (!title) {
        emptyFields.push('title')
      }
      if (!question) {
        emptyFields.push('question')
        }
        if (!options || options.length < 2) {
            emptyFields.push('options');
          }
      if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
        }
        
     // Create an array to store processed options
     const processedOptions = options.map(options => ({
        options,
        votes: 0, // Initialize votes as 0 for each option
     }));
        
            // Create the poll with the processed options
        const poll = await Poll.create({
            title,
        question,
            options: processedOptions,
            user: req.user._id
    });
    res.status(200).json(poll);
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

//delete a poll
const deletePoll = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such poll'})
    }
    const poll = await Poll.findOneAndDelete({ _id: id })
    if (!poll) {
        return res.status(404).json({error: 'No such poll'})
    }
    res.status(200).json(poll)
}

//update a poll
const updatePoll = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such poll'})
    }
    const poll = await Poll.findOneAndUpdate({_id: id}, {
      ...req.body
    },
    { new: true })
    if (!poll) {
      return res.status(400).json({error: 'No such poll'})
    }
    res.status(200).json(poll)
}
  
module.exports = {
    getAllPoll,
    getOnePoll,
    createPoll,
    deletePoll,
    updatePoll
}