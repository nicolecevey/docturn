import "./LoginForm.scss";
import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext"
import SignupForm from "../SignupForm/SignupForm";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const {login} = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [ loading, setLoading ] = useState(false)
  const history = useHistory()

   async function handleLogin(e) {
    e.preventDefault();
    console.log(e.target.email.value)
    if(!e.target.email.value || !e.target.password.value) {
      return setError("Please enter all fields.")
    }

    try {
      setError("")
      setLoading(true)
      await login(e.target.email.value, e.target.password.value)
      history.push("/documents")
    } catch {
      setError("Failed to sign in.")
    }
    setLoading(false)
  };

  const toggleModal = (event) => {
    setIsModalOpen(!isModalOpen);
  }
    return (
      <>
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="login-form__title">Login</h1>
          <input type="text" className="login-form__input" placeholder="Email" name="email"></input>
          <input type="text" className="login-form__input" placeholder="Password" name="password"></input>
          <button type="submit" className="login-form__button">Login</button>
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
      </>
    )
}

export default LoginForm;