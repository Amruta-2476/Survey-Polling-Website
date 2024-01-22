import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PollFillPage = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchPollDetails = async () => {
            try {
                if (!user || !user.token) {
                    console.log('User or token not available yet');
                    return;
                }
        
                const response = await fetch(`/api/poll/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (response.ok) {
                    const pollData = await response.json();
                    setPoll(pollData);
                } else {
                    console.error('Error fetching poll details');
                }
            } catch (error) {
                console.error('Error fetching poll details:', error);
            }
        };

        if (user && user.token) {
            fetchPollDetails();
        }
    }, [id, user]);

    const handleOptionClick = async (optionLabel) => {
        if (!selectedOption) {
            try {
                const response = await fetch(`/api/poll/vote/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ optionLabel }),
                });
    
                if (response.ok) {
                    setSelectedOption(optionLabel);
                    console.log('Vote submitted successfully');
                    // You may want to redirect or show a success message here
                } else {
                    console.error('Error submitting vote');
                }
            } catch (error) {
                console.error('Error submitting vote:', error);
            }
        }
    };
    

    return (
        <div>
            <h2>Poll Fill Page for Poll ID: {id}</h2>
            {poll ? (
                <>
                    <h2>Title of the poll: <u>{poll.title}</u></h2>
                    <div className="poll">
                        {poll.options.map((option) => (
                            <div
                                key={option.label}
                                className={`poll__option ${selectedOption === option.label ? "poll__option--selected" : ""}`}
                                onClick={() => handleOptionClick(option.label)}
                            >
                                <div className="poll__option-fill" style={{ width: `${option.percentage}%` }}></div>
                                <div className="poll__option-info">
                                    <span className="poll__label">{option.label}</span>
                                    <span className="poll__percentage">{option.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>...</p>
            )}
        </div>
    );
};

export default PollFillPage;
