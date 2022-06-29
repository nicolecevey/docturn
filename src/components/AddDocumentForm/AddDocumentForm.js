import "./AddDocumentForm.scss";
import documentIcon from "../../assets/document-512.png";
import { Link } from "react-router-dom";
import { addDoc, collection, getFirestore}  from "firebase/firestore";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function AddDocumentForm() {
  let history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault();
    const db = getFirestore();
    const documentRef = collection(db, "documents")

    addDoc(documentRef, {
      title: event.target.title.value,
      status: event.target.status.value,
      version: event.target.version.value,
      toReview: event.target.toReview.value,
      reviewerName: event.target.reviewerName.value,
      version: event.target.version.value,
      dateLastReviewed: event.target.dateLastReviewed.value
    })
    history.push("/documents")
  };

  return (
    <section className="add-form">
      <Link to="/documents" className="add-form__link">
        <button className="add-form__back-button">Back</button>
      </Link>
      <h1 className="add-form__title">Add Document</h1>
      <div className="add-form__container">
        <img src={documentIcon} className="add-form__icon"></img>
        <form className="add-form__form" onSubmit={submitHandler}>
          <label className="add-form__label add-form__label--title">
            Document Title:
            <input 
              type="text" 
              className="add-form__input" 
              name="title"
            ></input>
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
            <input 
              className="add-form__input" 
              type="number" 
              name="version"
            ></input>
          </label>
          <p className="add-form__label">Waiting for your review:</p>
          <label className="add-form__radio-label">
            <input
              type="radio"
              name="toReview"
              value="yes"
              className="add-form__radio"
            ></input>{" "}
            Yes
            <input
              type="radio"
              name="toReview"
              value="no"
              className="add-form__radio"
            ></input>{" "}
            No
          </label>
          <label className="add-form__label">
            Reviewer Name:
            <input 
              type="text" 
              className="add-form__input"
              name="reviewerName"
            ></input>
          </label>
          <label className="add-form__label"> Date Last Reviewed
            <input 
              type="date" 
              name="dateLastReviewed"
              className="add-form__input"
            ></input>
          </label>
          <button type="submit" className="add-form__add-button">
            Add
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddDocumentForm;
