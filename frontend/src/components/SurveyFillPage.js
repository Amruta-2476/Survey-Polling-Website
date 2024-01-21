import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const SurveyFillPage = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [survey, setSurvey] = useState(null); // State to store survey details
    const [formResponses, setFormResponses] = useState({}); // State to store user responses
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch survey details based on the id
        const fetchSurveyDetails = async () => {
            try {
                const response = await fetch(`/api/survey/${id}`, {
                    headers: {
                      'Authorization': `Bearer ${user.token}`, // Check how you retrieve the authentication token
                    },
                  });
                if (response.ok) {
                    const surveyData = await response.json();
                    setSurvey(surveyData);
                    // Navigate 
                    navigate(`/survey/${id}`);
                } else {
                    // Handle error when fetching survey details
                    console.error('Error fetching survey details');
                }
            } catch (error) {
                console.error('Error fetching survey details:', error);
            }
        };

        fetchSurveyDetails();
    }, [id, user]);

    

    const handleInputChange = (questionIndex, optionIndex, value) => {
        // Update the formResponses state based on user input
        // This may vary depending on your form structure
        setFormResponses((prevResponses) => ({
            ...prevResponses,
            [questionIndex]: { ...prevResponses[questionIndex], [optionIndex]: value },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, send formResponses to the server
        
        try {
            const response = await fetch('/api/survey/response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    surveyId: id,
                    responses: formResponses,
                }),
            });
            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                console.log('Survey response submitted successfully');
                // // Navigate 
                // navigate(`/survey/${id}`);
            } else {
                // Handle error when submitting survey responses
                console.error('Error submitting survey responses');
            }
        } catch (error) {
            console.error('Error submitting survey responses:', error);
        }
    };

    //   if (!survey) {
    //     return <div>Loading...</div>; // You may want to display a loader while fetching survey details
    //   }

    return (
        <div>
            <h2>Survey Fill Page for Survey ID: {id}</h2>
            {survey ? (
                <>
                    <h2>Title of the survey: <u>{survey.title}</u></h2>
                    <form onSubmit={handleSubmit}>
                        {/* Render survey questions and options based on survey data */}
                        {survey.questions.map((question, questionIndex) => (
                            <div key={questionIndex}>
                                <p> Q. {question.questionText}</p>
                                {/* Render options for each question */}
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question_${questionIndex}`}
                                                value={optionIndex}
                                                onChange={(e) => handleInputChange(questionIndex, optionIndex, e.target.value)}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="submit">Submit Survey</button>
                    </form>
                </>
            ) : (
                <p>...</p>
            )}
        </div>
    );
}
export default SurveyFillPage;
