import "./AddDocumentForm.scss";
import { Link } from "react-router-dom";
import { addDoc, collection, getFirestore}  from "firebase/firestore";
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
        <form className="add-form__form" onSubmit={submitHandler}>
          <label className="add-form__label add-form__label--title">
            Document Title
            <input 
              type="text" 
              className="add-form__input" 
              name="title"
            ></input>
          </label>
          <p className="add-form__label">Document Status</p>
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
              className="add-form__input" 
              type="number" 
              name="version"
            ></input>
          </label>
          <p className="add-form__label">Waiting for your review</p>
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
            Reviewer Name
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
