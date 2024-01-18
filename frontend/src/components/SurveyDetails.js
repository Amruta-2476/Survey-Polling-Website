import React from 'react';
const SurveyDetails = ({ survey }) => { 
      // Calculate the number of responses
//   const numberOfResponses = survey.getNumberOfResponses();
    return (
        <div className="survey-details">
            <h4>{survey.title}</h4>
            {/* <p><strong>Number of Responses: </strong>{numberOfResponses}</p> */}
            <p>{survey.createdAt}</p>
       </div>
   )
}
export default SurveyDetails;
