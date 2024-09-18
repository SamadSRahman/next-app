import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/user";
// Adjust the import according to your folder structure

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    // Reset errors
    setError("");
    setPassError("");
    setEmailError("");

    // Basic frontend validations
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid");
      isValid = false;
    }

    if (!password) {
      setPassError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPassError("Password must be at least 6 characters long");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, password);
      console.log(response);
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("userId", response.user.id);
      localStorage.setItem("userName", response.user.name);
      navigate("/");
    } catch (err) {
      if (err.response.status === 403) {
        setPassError("Invalid password");
      } else if (err.response.status === 404) {
        setError("User with this email not found");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (email, password, name, phone, confirmPassword) => {
    // Reset errors
    setError("");
    setPassError("");
    setEmailError("");

    // Basic frontend validations
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid");
      isValid = false;
    }

    if (!password) {
      setPassError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPassError("Password must be at least 6 characters long");
      isValid = false;
    }
    else if(password!==confirmPassword){
      console.log(password, confirmPassword);
      
      setPassError("Passwords do not match")
      isValid=false
    }

    if (!isValid) {
      return;
    }

    setLoading(true);
    let number = phone
    console.log(email, password, name, number);
    
    try {
      const response = await register(email, password, name, number);
      console.log(response);
      navigate("/signin");
    } catch (err) {
      if (err.response.status === 403) {
        setPassError("Invalid password");
      } else if (err.response.status === 404) {
        setError("User with this email not found");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return {
    loading,
    error,
    passError,
    emailError,
    handleLogin,
    handleLogout,
  handleRegister
  };
};

export default useAuth;
