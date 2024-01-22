import React, { useState } from 'react'
import { usePollsContext } from '../hooks/usePollsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const PollForm = () => {
    const { dispatch } = usePollsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ optionText: '', votes: 0 }]);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user) {
          setError('You must be logged in');
          return;
        }
    
        const poll = { title, question, options: options.map(option => option.optionText), };
    
        const response = await fetch('/api/poll', {
          method: 'POST',
          body: JSON.stringify(poll),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        });
    
        const json = await response.json();
    
        if (!response.ok) {
          setError(json.error);
          setEmptyFields(json.emptyFields);
        }
    
        if (response.ok) {
          setEmptyFields([]);
          setError(null);
          setTitle('');
          setQuestion('');
          setOptions([{ optionText: '', votes: 0 }]);  // Set options to an array with an empty object
          console.log('new poll added:', json);
          dispatch({ type: 'CREATE_POLL', payload: json });
        }
      };
    
      const handleAddOption = () => {
        setOptions([...options, { optionText: '', votes: 0 }]);
      };
    
      const handleRemoveOption = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
      };
      
      const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index].optionText = value;
        setOptions(updatedOptions);
      };
    
      return (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Create a New Poll</h3>
    
          <label>Poll Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
          />
    
          <label>Poll Question:</label>
          <input
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            className={emptyFields.includes('question') ? 'error' : ''}
          />
    
    {options.map((option, optionIndex) => (
  <div key={optionIndex}>
    <label>
      Option {optionIndex + 1}:
      <input
        type="text"
        value={option.optionText}
        onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
      />
      <button
        type="button"
        onClick={() => handleRemoveOption(optionIndex)}
      >
        Remove Option
      </button>

      </label>
  </div>
))}
    
          <button
            className="form-buttons"
            type="button"
            onClick={handleAddOption}
          >
            Add Option
          </button>
    
          <button className="form-buttons" type="submit">
            Create Poll
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      );
    };
    
    export default PollForm;