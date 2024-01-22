import { createContext, useReducer } from 'react'

export const PollsContext = createContext();

export const pollsReducer = (state, action) => {
    switch (action.type) { 
        case "SET_POLLS":
        return {
                poll: action.payload,
            };
            case 'CREATE_POLL':
                return {
                  poll: [action.payload, ...state.poll],
            };
            case 'DELETE_POLL':
                return {
                  poll: state.poll.filter((poll) => poll._id !== action.payload._id),
                };
              default:
                return state;
    }
}
export const PollsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pollsReducer, {
      poll: null,
    });
  
    return (
      <PollsContext.Provider value={{ ...state, dispatch }}>
        {children}
      </PollsContext.Provider>
    );
  };