import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SurveysContextProvider } from "./context/SurveysContext";
import { PollsContextProvider } from "./context/PollsContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SurveysContextProvider>
        <PollsContextProvider>
        <App />
        </PollsContextProvider>
      </SurveysContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
