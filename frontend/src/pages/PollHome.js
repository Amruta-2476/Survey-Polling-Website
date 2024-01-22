// Link is /pollHome
import { useEffect } from "react";
import { usePollsContext } from '../hooks/usePollsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import PollDetails from '../components/PollDetails'
import PollForm from "../components/PollForm";

const PollHome = () => {
    const { poll, dispatch } = usePollsContext();
    const { user } = useAuthContext();
   
  useEffect(() => {
    console.log("useEffect is running");
        const fetchPolls = async () => {
          try {
            const response = await fetch("/api/poll", {
              headers: {'Authorization': `Bearer ${user.token}`},
            });
    
            if (response.ok) {
              const json = await response.json();
              dispatch({type: 'SET_POLLS', payload: json});
            } else {
              console.error('Error fetching polls:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching polls:', error.message);
          }
        };
    
        if (user) {
          fetchPolls();
        }
      }, [dispatch, user]);
    
      return (
        <div className="poll-home">
          <div className="polls">
            {poll && poll.map(poll => (
              <PollDetails key={poll._id} poll={poll} />
            ))}
          </div>
          <PollForm />
        </div>
      );
    };

export default PollHome;