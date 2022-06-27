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
          <input
            type="text"
            placeholder="Document Title"
            className="add-form__input"
          ></input>
          <p>Document Status:</p>
          <label>
            <input type="radio" name="open" value="open"></input> Open
          </label>
          <label>
            <input type="radio" name="closed" value="closed"></input> Closed
          </label>
          <label>
            Version Number:
            <input type="number"></input>
          </label>
          <p>Waiting for your review:</p>
          <label>
            <input type="radio" name="yes" value="yes"></input> Yes
          </label>
          <label>
            <input type="radio" name="no" value="no"></input> No
          </label>
          <label>
            <input
              type="text"
              name="reviewerName"
              className="add-form__input"
              placeholder="Reviewer Name"
            ></input>
          </label>
        </form>
      </div>
    </section>
  );
}

export default AddDocumentForm;
