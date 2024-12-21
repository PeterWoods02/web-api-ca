import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/authForm";

const HomePageLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.includes("@")) {
      setErrorMessage("Invalid email address");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = await signUp(email, password);
      setUser(userData);
      navigate("/../../movies/home");
    } catch (error) {
      setErrorMessage(error.message || "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = await signIn(email, password);
      setUser(userData);
      navigate("/../../movies/home");
    } catch (error) {
      setErrorMessage(error.message || "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOutUser();
      setUser(null);
      navigate("/../../movies/HomePageLogIn");
    } catch (error) {
      setErrorMessage(error.message || "Sign-out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
      {user ? (
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleSignOut} disabled={loading}>
            {loading ? "Signing Out..." : "Sign Out"}
          </button>
        </>
      ) : (
        <AuthForm
          email={email}
          password={password}
          loading={loading}
          errorMessage={errorMessage}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSignUp={handleSignUp}
          onSignIn={handleSignIn}
        />
      )}
    </div>
  );
};

export default HomePageLogIn;
