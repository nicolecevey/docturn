import "./SignupForm.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext"

function SignupForm(props) {
  const {onClick} = props;
  const {signup} = useAuth()
  const [error, setError] = useState('')
  const [ loading, setLoading ] = useState(false)

  async function handleSignup(event) {
    event.preventDefault();
    console.log(event.target.email.value)
    if(!event.target.email.value || !event.target.password.value) {
      return setError("Please enter all fields.")
    }
    try {
      setError("")
      setLoading(true)
      await signup(event.target.email.value, event.target.password.value)
    } catch {
      setError("Failed to signup.")
    }
    setLoading(false)
  };

    return (
      <div className="modal">
        {error && <p>You shall not pass</p>}
        <form className="signup-form" onSubmit={handleSignup}>
          <img
            src={closeIcon}
            alt="Icon to close modal"
            className="signup-form__close"
            onClick={() => onClick()}
            ></img>
          <h1 className="signup-form__title">Signup</h1>
          <input
            type="text"
            className="signup-form__input"
            placeholder="Email"
            name="email"
          ></input>
          <input
            type="text"
            className="signup-form__input"
            placeholder="Password"
            name="password"
          ></input>
          <button type="submit" className="signup-form__button">
            Sign Up
          </button>
          <div className="signup-form__signup">
            <p>Already have an account?</p>
            <button
              type="button"
              className="signup-form__link"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }


export default SignupForm;

