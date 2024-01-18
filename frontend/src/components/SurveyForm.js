import { useState } from 'react';
import { useSurveysContext } from '../hooks/useSurveysContext'

const SurveyForm = () => {
  const { dispatch } = useSurveysContext()

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [''] }]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const survey = { title, questions };

    const response = await fetch('/api/survey', {
      method: 'POST',
      body: JSON.stringify(survey),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setTitle('');
      setQuestions([{ questionText: '', options: [''] }]);
      console.log('new survey added:', json);
      dispatch({type: 'CREATE_SURVEY', payload: json})
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [''] }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
    };
    const handleRemoveOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
      };
    
      const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
      };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a New Survey</h3>

      <label>Survey Title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>
            Question {questionIndex + 1}:
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
            />
          </label>

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>
                Option {optionIndex + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      />
                      <button
                  type="button"
                  onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                >
                  Remove Option
                </button> 
              </label>
            </div>
          ))}

          <button type="button" onClick={() => handleAddOption(questionIndex)}>
            Add Option
          </button>

          {questions.length > 1 && (
            <button type="button" onClick={() => handleRemoveQuestion(questionIndex)}>
              Remove Question
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>

      <button type="submit">Create Survey</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SurveyForm;
