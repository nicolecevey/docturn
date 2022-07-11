import "./AddDocumentForm.scss";
import { Link } from "react-router-dom";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

function AddDocumentForm() {
  // Form to add a new document to the documents database
  let history = useHistory();

  const [error, setError] = useState("");

  const submitHandler = (event) => {
    // When user clicks add button, they will add a new document
    event.preventDefault();
    const title = event.target.title.value;
    const status = event.target.status.value;
    const version = event.target.version.value;
    const toReview = event.target.toReview.value;
    const reviewerName = event.target.reviewerName.value;
    const dateLastReviewed = event.target.dateLastReviewed.value;

    const db = getFirestore();
    const documentRef = collection(db, "documents");

    try {
      if (!title || !status || !version || !toReview || !dateLastReviewed) {
        setError("Please fill out all highlighted fields.");
      } else if (error === "") {
        setError("");
        addDoc(documentRef, {
          title,
          status,
          version,
          toReview,
          reviewerName,
          dateLastReviewed,
        });
        // Return to documents page after successfully adding new document
        history.push("/documents");
      }
    } catch {
      setError("Failed to add document");
    }
  };

  return (
    <section className="add-form">
      <Link to="/documents" className="add-form__link">
        <button className="add-form__back-button">Back</button>
      </Link>
      <h1 className="add-form__title">Add Document</h1>
      <div className="add-form__container">
        <form className="add-form__form" onSubmit={submitHandler}>
          <label className="add-form__label add-form__label--title">
            Document Title
            <input
              type="text"
              className={
                error ? "error-input__add-document" : "add-form__input"
              }
              name="title"
            ></input>
          </label>
          <p className="add-form__label add-form__label--status">
            Document Status
            <span
              className={
                error ? "add-form__label--error" : "add-form__label--hidden"
              }
            >
              *
            </span>
          </p>
          <label className="add-form__radio-label">
            <input
              type="radio"
              name="status"
              value="Open"
              className="add-form__radio"
            ></input>{" "}
            Open
            <input
              type="radio"
              name="status"
              value="Closed"
              className="add-form__radio"
            ></input>{" "}
            Closed
          </label>
          <label className="add-form__label">
            Version Number
            <input
              className={
                error ? "error-input__add-document" : "add-form__input"
              }
              type="number"
              name="version"
            ></input>
          </label>
          <p className="add-form__label add-form__label--toReview">
            Waiting for your review
            <span
              className={
                error ? "add-form__label--error" : "add-form__label--hidden"
              }
            >
              *
            </span>
          </p>
          <label className="add-form__radio-label">
            <input
              type="radio"
              name="toReview"
              value="Yes"
              className="add-form__radio"
            ></input>{" "}
            Yes
            <input
              type="radio"
              name="toReview"
              value="No"
              className="add-form__radio"
            ></input>{" "}
            No
          </label>
          <label className="add-form__label">
            Reviewer Name (please leave empty if not being reviewed)
            <input
              type="text"
              className="add-form__input"
              name="reviewerName"
            ></input>
          </label>
          <label className="add-form__label">
            {" "}
            Date Last Reviewed
            <input
              type="date"
              name="dateLastReviewed"
              className={
                error ? "error-input__add-document" : "add-form__input"
              }
            ></input>
          </label>
          <button type="submit" className="add-form__add-button">
            Add
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </section>
  );
}

export default AddDocumentForm;
