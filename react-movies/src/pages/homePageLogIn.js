import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/authForm";
import { AuthContext } from "../contexts/authContext"; 

const HomePageLogIn = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const context = useContext(AuthContext); 

  const validateForm = () => {
    if (username.trim() === "") {
      setErrorMessage("Username is required");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Handle SignUp
  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = await context.register(username, password);  
      if (success) {
        context.authenticate(username, password);  
        navigate("/movies/home"); 
      }
    } catch (error) {
      setErrorMessage(error.message || "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle SignIn
  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await context.authenticate(username, password);  
      navigate("/movies/home");  
    } catch (error) {
      setErrorMessage(error.message || "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle SignOut
  const handleSignOut = () => {
    setLoading(true);
    try {
      context.signout();  
      navigate("/"); 
    } catch (error) {
      setErrorMessage(error.message || "Sign-out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
      {context.isAuthenticated ? (
        <>
          <h2>Welcome, {context.userName}</h2>
          <button onClick={handleSignOut} disabled={loading}>
            {loading ? "Signing Out..." : "Sign Out"}
          </button>
        </>
      ) : (
        <AuthForm
          username={username}  
          password={password}
          loading={loading}
          errorMessage={errorMessage}
          onUsernameChange={(e) => setUsername(e.target.value)}  
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSignUp={handleSignUp}
          onSignIn={handleSignIn}
        />
      )}
    </div>
  );
};

export default HomePageLogIn;
