import "./EditDocumentForm.scss";
import { Link } from "react-router-dom";
import { updateDoc, doc, getFirestore }  from "firebase/firestore";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function EditDocumentForm() {
  let history = useHistory()
  const { id } = useParams()
  const [error, setError] = useState('');
  const [document, setDocument] = useState([])

  useEffect(() => {
    try {
      db.collection('documents').doc(id).get()
      .then(snapshot => setDocument(snapshot.data()))
    } catch (error) {
      const { message } = error;
      setError(message);
        console.log(error);
    }
  }, [id]);

  async function editDocument(event) {
    event.preventDefault();
    const db = getFirestore();
    const documentRef = doc(db, "documents", id)

    await updateDoc(documentRef, {
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
              className="edit-form__input" 
              name="title"
              placeholder={document.title}
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
            ></input>{" "}
            Open
            <input
              type="radio"
              name="status"
              value="Closed"
              className="edit-form__radio"
              defaultChecked={!document.status}
            ></input>{" "}
            Closed
          </label>
          <label className="edit-form__label">
            Version Number
            <input 
              className="edit-form__input" 
              type="number" 
              name="version"
              placeholder={document.version}
            ></input>{" "}
          </label>
          <p className="edit-form__label">Waiting for your review</p>
          <label className="edit-form__radio-label">
            <input
              type="radio"
              name="toReview"
              value="yes"
              className="edit-form__radio"
              defaultChecked={document.toReview}
            ></input>{" "}
            Yes
            <input
              type="radio"
              name="toReview"
              value="no"
              className="edit-form__radio"
              defaultChecked={!document.toReview}
            ></input>{" "}
            No
          </label>
          <label className="edit-form__label">
            Reviewer Name:
            <input 
              type="text" 
              className="edit-form__input"
              name="reviewerName"
              placeholder={document.reviewerName === undefined ? "No current reviewer" : document.reviewerName }
            ></input>{" "}
          </label>
          <label className="edit-form__label"> Date Last Reviewed
            <input 
              type="date"   
              name="dateLastReviewed"
              className="edit-form__input"
              defaultValue={document.dateLastReviewed}
            ></input>{" "}
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
