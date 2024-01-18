import { useEffect } from "react";
import { useSurveysContext } from '../hooks/useSurveysContext'

// components
import SurveyDetails from '../components/SurveyDetails'
import SurveyForm from "../components/SurveyForm";

const Home = () => {
  const { survey, dispatch } = useSurveysContext()

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await fetch("/api/survey");
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_SURVEYS', payload: json})
      }
    };

    fetchSurveys();
  }, [dispatch]);

  return (
    <div className="home">
          <div className="survey">
              {survey && survey.map(survey => (
                 <SurveyDetails key={survey._id} survey={survey} />
              ))}
          </div>
          <SurveyForm />
    </div>
  );
};

export default Home;
