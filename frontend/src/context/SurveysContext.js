import { createContext, useReducer } from 'react'

export const SurveysContext = createContext()

export const surveysReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SURVEYS':
        return { 
          survey: action.payload 
        }
      case 'CREATE_SURVEY':
        return { 
            survey: [action.payload, ...state.survey] 
        }
      case 'DELETE_SURVEY':
        return { 
            survey: state.survey.filter((s) => s._id !== action.payload._id)
        }
      default:
        return state
    }
  }

export const SurveysContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(surveysReducer, { 
      survey: null
    })
    
    return (
      <SurveysContext.Provider value={{ ...state, dispatch }}>
        { children }
      </SurveysContext.Provider>
    )
  }