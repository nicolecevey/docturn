import "./EditDocumentForm.scss";
import documentIcon from "../../assets/document-512.png";
import { Link } from "react-router-dom";
import { updateDoc, doc, getFirestore }  from "firebase/firestore";
import { useHistory } from "react-router-dom";

function EditDocumentForm() {
  let history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault();
    const db = getFirestore();
    const documentRef = doc(db, "documents", event.target.id.value)

    updateDoc(documentRef, {
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
    <section className="edit-form">
      <Link to="/documents" className="edit-form__link">
        <button className="edit-form__back-button">Back</button>
      </Link>
      <h1 className="edit-form__title">Edit Document</h1>
      <div className="edit-form__container">
        <img src={documentIcon} className="edit-form__icon"></img>
        <form className="edit-form__form" onSubmit={submitHandler}>
          <label className="edit-form__label edit-form__label--title">
            Document Title:
            <input 
              type="text" 
              className="edit-form__input" 
              name="title"
            ></input>
          </label>
          <p className="edit-form__label">Document Status:</p>
          <label>
            <input
              type="radio"
              name="status"
              value="open"
              className="edit-form__radio"
            ></input>{" "}
            Open
            <input
              type="radio"
              name="status"
              value="closed"
              className="edit-form__radio"
            ></input>{" "}
            Closed
          </label>
          <label className="edit-form__label">
            Version Number:
            <input 
              className="edit-form__input" 
              type="number" 
              name="version"
            ></input>
          </label>
          <p className="edit-form__label">Waiting for your review:</p>
          <label className="edit-form__radio-label">
            <input
              type="radio"
              name="toReview"
              value="yes"
              className="edit-form__radio"
            ></input>{" "}
            Yes
            <input
              type="radio"
              name="toReview"
              value="no"
              className="edit-form__radio"
            ></input>{" "}
            No
          </label>
          <label className="edit-form__label">
            Reviewer Name:
            <input 
              type="text" 
              className="edit-form__input"
              name="reviewerName"
            ></input>
          </label>
          <label className="edit-form__label"> Date Last Reviewed
            <input 
              type="date" 
              name="dateLastReviewed"
              className="edit-form__input"
            ></input>
          </label>
          <button type="submit" className="edit-form__edit-button">
            Edit
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditDocumentForm;
