import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SurveysContextProvider } from "./context/SurveysContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SurveysContextProvider>
        <App />
      </SurveysContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
