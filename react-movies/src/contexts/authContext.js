import React, { useState, createContext } from "react";
import { signIn, signUp } from "../api/authApi.js"; // Ensure this matches your API setup

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  // Function to set JWT token in localStorage
 const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
    setIsAuthenticated(true);
  };

  const authenticate = async (username, password) => {
    try {
      const result = await signIn(username, password);
      console.log("API Response:", result); // Log response
      if (result.token) {
        setToken(result.token);
        setUserName(username);
      } else {
        throw new Error("Invalid credentials or missing token");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };
  

  const register = async (username, password) => {
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        authToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
