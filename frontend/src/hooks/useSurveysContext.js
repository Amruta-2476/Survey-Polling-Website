import { SurveysContext } from '../context/SurveysContext'
import { useContext } from "react";

export const useSurveysContext = () => {
    const context = useContext(SurveysContext)
  
    if(!context) {
      throw Error('useSurveysContext must be used inside an SurveysContextProvider')
    }
  
    return context
  }