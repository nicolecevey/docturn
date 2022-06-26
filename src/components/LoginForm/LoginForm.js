import "./LoginForm.scss";
import axios from "axios";
import React from "react";
import SignupForm from "../SignupForm/SignupForm";

class LoginForm extends React.Component {

  state = {
    isLoggedIn: !sessionStorage.authToken,
    isModalOpen: false,
  }

  handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/login", {
      username: e.target.username.value ,
      password: e.target.password.value
    })
    .then(({ data }) => {
      console.log(data)
      // SUCCESS: store token in sessionStorage, isLoggedIn = true
      sessionStorage.authToken = data.token;
      this.setState({
        isLoggedIn: true
      })

    }).catch(() => {
      alert("Please provide the correct username and password.");
    })
    return false;
  }

  toggleModal = (event) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    // if (this.state.isLoggedIn) {
    //     history.push({
    //         pathname: "/documents",
    //   })
    // }
    return(
      <>
        <form onSubmit={this.handleLogin} className="login-form">
          <h1 className="login-form__title">Login</h1>
          <input type="text" className="login-form__input" placeholder="Username" name="username"></input>
          <input type="text" className="login-form__input" placeholder="Password" name="password"></input>
          <button type="submit" className="login-form__button">Login</button>
          <div className="login-form__signup">
              <p>New to DocTurn?</p>
              <button
              type="button" 
              className="login-form__link"
              onClick={((event) => this.toggleModal(event))}
              >Sign Up</button>
          </div>
        </form>
        {this.state.isModalOpen && (
          <SignupForm onClick={this.toggleModal}/>
        )}
      </>


    )
  }
}

export default LoginForm;