import axios from "axios";
import "./SignupForm.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import React from "react";

class SignupForm extends React.Component {

  state = {
    isSignedUp: !sessionStorage.authToken,
    isModalOpen: false,
  };

  handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/signup", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then(({ data }) => {
        console.log(data);
        // SUCCESS: store token in sessionStorage, isLoggedIn = true
        sessionStorage.authToken = data.token;
        this.setState({
          // isSignedUp: true,
        });
      })
      .catch(() => {
        alert("Signup failed");
      });
    return false;
  };

  // onSubmitHandler = (endpoint) => {
  //   axios.post(endpoint);
  //   this.setState({
  //     isModalOpen: !this.state.isModalOpen,
  //   });
  //   console.log(endpoint);
  // };

  toggleModal = (event) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    return (
      <div className="modal">
        <form className="signup-form" onSubmit={this.handleSignup}>
          <img
            src={closeIcon}
            alt="Icon to close modal"
            className="signup-form__close"
            onClick={(event) => this.toggleModal(event)}
            ></img>
          <h1 className="signup-form__title">Signup</h1>
          <input
            type="text"
            className="signup-form__input"
            placeholder="Username"
            name="username"
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
              onClick={(event) => this.toggleModal(event)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;

