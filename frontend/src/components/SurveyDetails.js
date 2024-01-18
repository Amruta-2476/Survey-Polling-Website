import { useSurveysContext } from '../hooks/useSurveysContext'
import React from 'react';
const SurveyDetails = ({ survey }) => { 
      // Calculate the number of responses
    //   const numberOfResponses = survey.getNumberOfResponses();
    const { dispatch } = useSurveysContext()
    const handleClick = async () => {
        const response = await fetch('/api/survey/' + survey._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        
    if (response.ok) {
       dispatch({type: 'DELETE_SURVEY', payload: json})
      }
    }

    
    return (
        <div className="survey-details">
            <h4>{survey.title}</h4>
            {/* <p><strong>Number of Responses: </strong>{numberOfResponses}</p> */}
            <p>{survey.createdAt}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
       </div>
   )
}
export default SurveyDetails;
