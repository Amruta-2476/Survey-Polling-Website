import { usePollsContext } from '../hooks/usePollsContext'
//date fns = to format date
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

import React from 'react';


const PollDetails = ({ poll }) => {
    const { dispatch } = usePollsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
          alert('You must be logged in to delete a poll');
        }
        const response = await fetch('/api/poll/' + poll._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
    
        if (response.ok) {
          dispatch({ type: 'DELETE_POLL', payload: json });
        }
    };
    
    return (
        <Link to={`/poll/${poll._id}`}>
      <div className="poll-details">
        <h4>{poll.title}</h4>
        <p>{formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>
          Delete
        </span>
      </div>
    </Link>
  );
};
export default PollDetails;