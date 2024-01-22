import { PollsContext } from '../context/PollsContext'
import { useContext } from "react";

export const usePollsContext = () => {
    const context = useContext(PollsContext)
  
    if(!context) {
      throw Error('usePollsContext must be used inside an PollsContextProvider')
    }
  
    return context
  }