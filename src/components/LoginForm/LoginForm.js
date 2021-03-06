import "./LoginForm.scss";
import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext"
import SignupForm from "../SignupForm/SignupForm";
import { useHistory } from "react-router-dom";

function LoginForm() {
  // Component to log in to site
  // Once user successfully logs in, the user gets redirected to documents page
  const {login} = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

   async function handleLogin(event) {
    event.preventDefault();
    const email = event.target.email.value
    const password = event.target.password.value;
   
    if(!email|| !password) {
      return setError("Please enter all fields.")
    }

    try {
      setError("")
      await login(email, password)
      // Once authentication is successful, redirect user
      history.push("/documents")
    } catch {
      setError("Failed to log in.")
    }
  };

  const toggleModal = () => {
    // Toggles signup modal
    setIsModalOpen(!isModalOpen);
  }
    return (
      <div>
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="login-form__title">Login</h1>
          <input 
            type="email" 
            className={!error ? "login-form__input" : "error-input__login"} 
            placeholder="Email" name="email">
          </input>
          <input 
            type="password" 
            className={!error ? "login-form__input" : ("error-input__login")} 
            placeholder="Password" 
            name="password">
          </input>
          <button type="submit" className="login-form__button">Login</button>
          {error && <p className="error">{error}</p>}
          <div className="login-form__signup">
              <p>New to DocTurn?</p>
              <button
              type="button" 
              className="login-form__link"
              onClick={() => setIsModalOpen(true)}
              >Sign Up</button>
          </div>
        </form>
        {isModalOpen && (
          <SignupForm onClick={toggleModal}/>
        )}
      </div>
    )
}

export default LoginForm;