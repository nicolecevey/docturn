import "./SignupForm.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext"

function SignupForm(props) {
  // Component that allows users to sign up with password and email
  const {onClick} = props;
  const {signup} = useAuth()
  const [error, setError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignup(event) {
    // When user enters an email and password that does not trigger error handlers, they will successfully signup
    event.preventDefault();
    const email = event.target.email.value
    const password = event.target.password.value;

    if(!email) {
       setEmailError("Please do not leave email blank.")
    } else if((email).includes("@") === false) {
       setEmailError("Please enter a valid email address.")
    } 
    if (!password) {
      setPasswordError("Please do not leave password blank.")
    } else if (password.length < 6) {
       setPasswordError("Please enter a password longer than 6 characters.")
    }

    try {
      setError("")
      setLoading(true)
      await signup(email,password)
    } catch {
      setError("Failed to signup.")
    }
    setLoading(false)
  };

  function handleChange() {
    // User can clear error state by clicking on input fields
    setError("")
    setEmailError("")
    setPasswordError("")
  }

    return (
      <div className="modal">
        <form className="signup-form" onSubmit={handleSignup}>
          <img
            src={closeIcon}
            alt="Icon to close modal"
            className="signup-form__close"
            onClick={() => onClick()}
            ></img>
          <h1 className="signup-form__title">Signup</h1>
          <input
            type="email"
            className={!emailError ? "signup-form__input " : "error-input"}
            placeholder="Email"
            name="email"
            onClick={handleChange}
          ></input>
          {emailError && <p className="error">{emailError}</p>}
          <input
            type="password"
            className={!passwordError ? "signup-form__input " : "error-input"}
            placeholder="Password"
            name="password"
            onClick={handleChange}
          ></input>
          {passwordError && <p className="error">{passwordError}</p>}
          <button type="submit" className="signup-form__button">
            Sign Up
          </button>
          {error && <p className="error">{error}</p>}
          <div className="signup-form__signup">
            <p>Already have an account?</p>
            <button
              type="button"
              className="signup-form__link"
              disabled={loading}
              onClick={() => onClick()}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }


export default SignupForm;

