import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const SurveyFillPage = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [survey, setSurvey] = useState(null);
    const [formResponses, setFormResponses] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveyDetails = async () => {
            try {
                if (!user || !user.token) {
                    console.log('User or token not available yet');
                    return;
                }
                const response = await fetch(`/api/survey/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                if (response.ok) {
                    const surveyData = await response.json();
                    setSurvey(surveyData);
                } else {
                    console.error('Error fetching survey details');
                }
            } catch (error) {
                console.error('Error fetching survey details:', error);
            }
        };

        if (user && user.token) {
            fetchSurveyDetails();
        }
    }, [id, user]);

    const handleInputChange = (questionIndex, optionIndex, value) => {
        setFormResponses((prevResponses) => ({
            ...prevResponses,
            [questionIndex]: { ...prevResponses[questionIndex], [optionIndex]: value },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/survey/response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    surveyId: id,
                    responses: formResponses,
                }),
            });
            if (response.ok) {
                console.log('Survey response submitted successfully');
                navigate(`/success-survey`);
            } else {
                console.error('Error submitting survey responses');
            }
        } catch (error) {
            console.error('Error submitting survey responses:', error);
        }
    };

    return (
        <div className='surveyFillPage'>
            <h2>Survey Fill Page for Survey ID: {id}</h2>
            {survey ? (
                <>
                    <h2>Title of the survey: <u>{survey.title}</u></h2>
                    <form onSubmit={handleSubmit}>
                        {/* Render survey questions and options based on survey data */}
                        {survey.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="surveyQuestion">
                                <p>{`Q${questionIndex + 1}. ${question.questionText}`}</p>
                                {/* Render options for each question */}
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <label className='questionLabel'>
                                            <input
                                                className='radioLabel'
                                                type="radio"
                                                name={`question_${questionIndex}`}
                                                value={optionIndex}
                                                onChange={(e) => handleInputChange(questionIndex, optionIndex, e.target.value)}
                                            />
                                            {`${String.fromCharCode(97 + optionIndex)}. ${option}`}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="submit" className='submitSurvey'>Submit Survey</button>
                    </form>
                </>
            ) : (
                <p>...</p>
            )}
        </div>
    );
}

export default SurveyFillPage;
