import "./EditDocumentForm.scss";
import { Link } from "react-router-dom";
import { updateDoc, doc, getFirestore }  from "firebase/firestore";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function EditDocumentForm() {
  // Form to edit a document and changes will be saved to database
  let history = useHistory()
  const { id } = useParams()
  const [error, setError] = useState('');
  const [document, setDocument] = useState([])

  useEffect(() => {
    // Get document from database by id
    // Need set document data so that it can be displayed as placeholder
    try {
      db.collection('documents').doc(id).get()
      .then(snapshot => setDocument(snapshot.data()))
    } catch (error) {
      const { message } = error;
      setError(message);
    }
  }, [id]);

  async function editDocument(event) {
    // Edit document on click on button
    event.preventDefault();
    const title = event.target.title.value;
    const version = event.target.version.value;

    const db = getFirestore();
    const documentRef = doc(db, "documents", id)

    if (
      !title ||
      !version
    ) {
      setError("Please fill out all highlighted fields.")
    } else if (error === "") {
      await updateDoc(documentRef, {
        title: event.target.title.value,
        status: event.target.status.value,
        version: event.target.version.value,
        toReview: event.target.toReview.value,
        reviewerName: event.target.reviewerName.value,
        dateLastReviewed: event.target.dateLastReviewed.value
      })
      // Return to documents page when successfully updated
      history.push("/documents")
    }
  };

  const changeHandler = () => {
    // User should be able to click on form input to remove error state
    setError("")
  }

  return (
    <section className="edit-form">
      <Link to="/documents" className="edit-form__link">
        <button className="edit-form__back-button">Back</button>
      </Link>
      <h1 className="edit-form__title">Edit Document</h1>
      <div className="edit-form__container">
        <form className="edit-form__form" onSubmit={editDocument}>
          <label className="edit-form__label edit-form__label--title">
            Document Title
            <input 
              type="text" 
              className={error ? "error-input__edit-document" : "edit-form__input"}
              name="title"
              placeholder={document.title}
              onKeyDown={changeHandler}
            ></input>
          </label>
          <p className="edit-form__label">Document Status</p>
          <label className="edit-form__radio-label">
            <input
              type="radio"
              name="status"
              value="Open"
              className="edit-form__radio"
              defaultChecked={document.status}
              onClick={changeHandler}
            ></input>{" "}
            Open
            <input
              type="radio"
              name="status"
              value="Closed"
              className="edit-form__radio"
              defaultChecked={!document.status}
              onClick={changeHandler}
            ></input>{" "}
            Closed
          </label>
          <label className="edit-form__label">
            Version Number
            <input 
              className={error ? "error-input__edit-document" : "edit-form__input"}
              type="number" 
              name="version"
              placeholder={document.version}
              onKeyDown={changeHandler}
            ></input>{" "}
          </label>
          <p className="edit-form__label">Waiting for your review</p>
          <label className="edit-form__radio-label">
            <input
              type="radio"
              name="toReview"
              value="Yes"
              className="edit-form__radio"
              defaultChecked={document.toReview}
              onClick={changeHandler}
            ></input>{" "}
            Yes
            <input
              type="radio"
              name="toReview"
              value="No"
              className="edit-form__radio"
              defaultChecked={!document.toReview}
              onClick={changeHandler}
            ></input>{" "}
            No
          </label>
          <label className="edit-form__label">
            Reviewer Name (please leave empty if not being reviewed)
            <input 
              type="text" 
              className="edit-form__input"
              name="reviewerName"
              placeholder={document.reviewerName === undefined ? "No current reviewer" : document.reviewerName }
              onKeyDown={changeHandler}
            ></input>{" "}
          </label>
          <label className="edit-form__label"> Date Last Reviewed
            <input 
              type="date"   
              name="dateLastReviewed"
              className="edit-form__input"
              defaultValue={document.dateLastReviewed}
              onClick={changeHandler}
            ></input>{" "}
          </label>
          <button type="submit" className="edit-form__edit-button">
            Edit
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </section>
  );
}

export default EditDocumentForm;
