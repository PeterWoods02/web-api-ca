import React from "react";

const AuthForm = ({
  email = "",
  password = "",
  loading = false,
  errorMessage = "",
  onEmailChange = () => {},
  onPasswordChange = () => {},
  onSignUp = () => {},
  onSignIn = () => {},
}) => {
  // Shared style for inputs
  const inputStyle = {
    padding: "8px",
    margin: "10px 0",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  // Shared style for buttons
  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    cursor: "pointer",
    border: "1px solid #4CAF50",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "white",
  };

  return (
    <div>
      <h1>TMDB Client Log In / Sign Up</h1>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
      )}

      {/* Email Input */}
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        style={inputStyle}
        disabled={loading}
      />

      {/* Password Input */}
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
        style={inputStyle}
        disabled={loading}
      />

      {/* Sign Up Button */}
      <button
        onClick={onSignUp}
        style={buttonStyle} 
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Sign In Button */}
      <button
        onClick={onSignIn}
        style={buttonStyle}
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </div>
  );
};

export default AuthForm;
