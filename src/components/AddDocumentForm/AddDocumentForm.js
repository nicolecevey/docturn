import "./AddDocumentForm.scss";
import documentIcon from "../../assets/document-512.png";
import { Link } from "react-router-dom";

function AddDocumentForm() {
  return (
    <section className="add-form">
      <Link to="/documents" className="add-form__link">
        <button className="add-form__button">Back</button>
      </Link>
      <h1 className="add-form__title">Add Document</h1>
      <div className="add-form__container">
        <img src={documentIcon} className="add-form__icon"></img>
        <form className="add-form__form">
          <label className="add-form__label add-form__label--title">Document Title:
            <input
                type="text"
                className="add-form__input"
            ></input>
          </label>
          <p className="add-form__label">Document Status:</p>
          <label>
            <input type="radio" name="status" value="open" className="add-form__radio"></input> Open
            <input type="radio" name="status" value="closed" className="add-form__radio"></input> Closed
          </label>
          <label className="add-form__label">
            Version Number:
            <input className="add-form__input" type="number"></input>
          </label>
          <p className="add-form__label">Waiting for your review:</p>
          <label className="add-form__radio-label">
            <input type="radio" name="review" value="yes" className="add-form__radio"></input> Yes
            <input type="radio" name="review" value="no" className="add-form__radio"></input> No
          </label>
          <label className="add-form__label">Reviewer Name:
            <input
                type="text"
                className="add-form__input"
            ></input>
          </label>
        </form>
      </div>
    </section>
  );
}

export default AddDocumentForm;
