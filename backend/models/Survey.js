const mongoose = require('mongoose')

const Schema = mongoose.Schema

const surveySchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String], // Array of strings representing different options for the survey question
        required: true
    },
    responses: {
        type: [{
          user: {
            type: mongoose.Schema.Types.ObjectId, // Assuming each response is associated with a user
            ref: 'User', // Make sure to replace 'User' with your actual user model
            required: true
          },
          selectedOption: {
            type: String,
            required: true
          }
        }],
        default: [] // Array to store responses, initialized as empty
      }
    }, { timestamps: true });
    
    module.exports = mongoose.model('Survey', surveySchema);

    // REFER THIS W/O FAIL
    //  ref: 'User', // Make sure to replace 'User' with your actual user model
    // https://chat.openai.com/c/b5a41564-52cc-44f5-b2b7-7f173c45b05c