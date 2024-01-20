import { useSurveysContext } from '../hooks/useSurveysContext'
//date fns = to format date
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

import React from 'react';
const SurveyDetails = ({ survey }) => { 
      // Calculate the number of responses
    //   const numberOfResponses = survey.getNumberOfResponses();
   
    const { dispatch } = useSurveysContext()
    const { user } = useAuthContext()
    const handleClick = async () => {
        if (!user) {
        alert('You must be logged in to delete a survey')
        }
        const response = await fetch('/api/survey/' + survey._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
    if (response.ok) {
       dispatch({type: 'DELETE_SURVEY', payload: json})
      }
    }

    
    return (
        <Link to={`/survey/${survey._id}`}>
        <div className="survey-details">
            <h4>{survey.title}</h4>
            {/* <p><strong>Number of Responses: </strong>{numberOfResponses}</p> */}
            <p>{formatDistanceToNow(new Date(survey.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
            </div>
            </Link>
   )
}
export default SurveyDetails;
