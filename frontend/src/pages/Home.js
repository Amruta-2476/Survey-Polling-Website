import { useEffect } from "react";
import { useSurveysContext } from '../hooks/useSurveysContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import SurveyDetails from '../components/SurveyDetails'
import SurveyForm from "../components/SurveyForm";

const Home = () => {
  const { survey, dispatch } = useSurveysContext()
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await fetch("/api/survey", {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_SURVEYS', payload: json})
      }
    };

    if (user) {
      fetchSurveys()
    }
  }, [dispatch, user]);

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
