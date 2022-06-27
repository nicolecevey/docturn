import "./AddDocumentForm.scss";
import documentIcon from "../../assets/document-512.png";
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

class AddDocumentForm extends Component {

    state = {
        title: "",
        isOpen: true,
        version: 0,
        forReview: true,
        reviewerName: "",
    }

  changeHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    let newDocument = {
        title: this.state.title,
        isOpen: this.state.isOpen,
        version: this.state.version,
        forReview: this.state.forReview,
        reviewerName: this.state.reviewerName,
    }
    axios.post("http://localhost:8080/documents/add", newDocument).then(() => {
        const { history: { push } } = this.props;
        push("/documents")
    })
  };

  render() {
    return (
      <section className="add-form">
        <Link to="/documents" className="add-form__link">
          <button className="add-form__back-button">Back</button>
        </Link>
        <h1 className="add-form__title">Add Document</h1>
        <div className="add-form__container">
          <img src={documentIcon} className="add-form__icon"></img>
          <form className="add-form__form">
            <label className="add-form__label add-form__label--title">
              Document Title:
              <input type="text" className="add-form__input"></input>
            </label>
            <p className="add-form__label">Document Status:</p>
            <label>
              <input
                type="radio"
                name="status"
                value="open"
                className="add-form__radio"
              ></input>{" "}
              Open
              <input
                type="radio"
                name="status"
                value="closed"
                className="add-form__radio"
              ></input>{" "}
              Closed
            </label>
            <label className="add-form__label">
              Version Number:
              <input className="add-form__input" type="number"></input>
            </label>
            <p className="add-form__label">Waiting for your review:</p>
            <label className="add-form__radio-label">
              <input
                type="radio"
                name="review"
                value="yes"
                className="add-form__radio"
              ></input>{" "}
              Yes
              <input
                type="radio"
                name="review"
                value="no"
                className="add-form__radio"
              ></input>{" "}
              No
            </label>
            <label className="add-form__label">
              Reviewer Name:
              <input type="text" className="add-form__input"></input>
            </label>
            <button type="submit" className="add-form__add-button">
              Add
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default AddDocumentForm;
