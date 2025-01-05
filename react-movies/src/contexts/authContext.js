import React, { useState, createContext } from "react";
import { signIn, signUp } from "../api/authApi.js";
import { Snackbar, Alert } from "@mui/material"; 

const defaultAuthContext = {
  isAuthenticated: false,
  authenticate: () => {},
  register: () => {},
  signout: () => {},
  userName: "",
  authToken: null,
};

export const AuthContext = createContext(defaultAuthContext);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);  
  const [snackbarMessage, setSnackbarMessage] = useState(""); 
  const [snackbarSeverity, setSnackbarSeverity] = useState("error"); 

  // Function to set JWT token in localStorage
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  // Email validation using regex
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    // Minimum length of 6, at least one number, one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  // Function to handle showing the Snackbar with a message
  const showSnackbar = (message, severity = "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const authenticate = async (username, password) => {
    // Validate email and password
    if (!validateEmail(username)) {
      showSnackbar("Invalid email format.");
      return; // Early return to prevent proceeding with the API call
    }
    if (!validatePassword(password)) {
      showSnackbar("Password must be at least 6 characters long, contain at least one number and one special character.");
      return; // Early return to prevent proceeding with the API call
    }

    // Proceed to sign in if validation passes
    const result = await signIn(username, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    // Validate email and password
    if (!validateEmail(username)) {
      showSnackbar("Invalid email format.");
      return false; // Return false to stop the process
    }
    if (!validatePassword(password)) {
      showSnackbar("Password must be at least 6 characters long, contain at least one number and one special character.");
      return false; // Return false to stop the process
    }

    // Proceed to register if validation passes
    const result = await signUp(username, password);
    if (result.code === 201) {
      return true;
    }
    return false;
  };

  const signout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAuthToken(null);
    setUserName("");
  };

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        authToken,
      }}
    >
      {props.children}

      {/* Snackbar component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Auto-hide after 6 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
