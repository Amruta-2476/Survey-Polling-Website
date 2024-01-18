import { useEffect, useState } from "react";
// components
import SurveyDetails from '../components/SurveyDetails'

const Home = () => {
  const [survey, setSurveys] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await fetch("/api/survey");
      const json = await response.json();

      if (response.ok) {
        setSurveys(json);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="home">
          <div className="survey">
              {survey && survey.map((survey) => (
                 <SurveyDetails key={survey._id} survey={survey} />
              ))}
          </div>
    </div>
  );
};

export default Home;
