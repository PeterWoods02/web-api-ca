// src/api/authApi.js
export const signUp = async (username, password) => {
    const response = await fetch("http://localhost:8080/api/users/signup?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),  
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign-up failed");
    }
  
    return await response.json(); 
  };
  
  export const signIn = async (username, password) => {
  try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Login error:", error);
      throw new Error(error.message || "Sign-in failed");
    }

    const data = await response.json();
  console.log('Login response:', data); 
  if (data && data.token) {
    localStorage.setItem("token", data.token); 
  } else {
    throw new Error("Token not found in response");
  }
  return data; 
  } catch (error) {
    console.error("Error in signIn:", error.message || error);
    throw error;
  }
};


  