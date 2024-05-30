import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createContext } from "react";
import "./App.css";
import { Router } from "react-router-dom";
import history from "./utils/history";

// export const server = "http://localhost:4000/api/v1";
export const server = "https://backend-cp.onrender.com/api/v1"

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router history={history}>
      <AppWrapper />
    </Router>
  </React.StrictMode>
);
