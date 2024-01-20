import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from './pages/Home'
import PollHome from "./pages/PollHome";
import Greeting from "./components/Greeting";
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/SignUp'
// import SurveyDetails from './SurveyDetails';
import SurveyFillPage from './components/SurveyFillPage'; 

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/greeting" />} />
            
            <Route
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            {/* <Route
              path="/pollHome" 
              element={user ? <PollHome /> : <Navigate to="/login" />} 
            /> */}
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to='/' />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to='/' />} 
            />

            <Route path="/greeting" element={<Greeting />} /> 
            
            <Route path="/survey/:id" element={<SurveyFillPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
