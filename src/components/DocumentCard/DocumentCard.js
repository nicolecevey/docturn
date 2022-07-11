import "./DocumentCard.scss";
import React, { useState } from "react";
import documentIcon from "../../assets/icons/document-icon.svg";
import reviewIcon from "../../assets/icons/review-icon.svg";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";

function DocumentCard({
  id,
  title,
  status,
  toReview,
  reviewerName,
  lastReviewed,
  version,
}) {
  // Component for individual document cards
  // Renders specific details about the document based on the id of the document
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timestampToDate = (timestamp) => {
    // Changes the date format
    let date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const toggleModal = () => {
    // Toggle the delete modal to delete a document
    setIsModalOpen(!isModalOpen);
  };

  return (
    <article
      className={`
        document-card 
        ${
          (toReview === "yes" || toReview === "Yes") &&
          "document-card--highlight-border"
        }
        ${
          (status === "closed" || status === "Closed") &&
          "document-card--closed-border"
        }
        `}
      id={id}
    >
      <div className="document-card__col">
        <div className="document-card__pills">
          <span
            className={`document-card__status ${
              status === "open" || status === "Open"
                ? "document-card__status--open"
                : "document-card__status--closed"
            }`}
          >
            {status}
          </span>
          {(toReview === "yes" || toReview === "Yes") && (
            <span className="document-card__review">To Review</span>
          )}
        </div>
        <img
          src={documentIcon}
          className="document-card__icon"
          alt="Document icon"
        ></img>
        <div className="document-card__details">
          <h4 className="document-card__details--title">{title}</h4>
          <span
            className={`document-card__reviewer-pill ${
              (toReview === "yes" || toReview === "Yes") &&
              "document-card__reviewer-pill--review"
            }`}
          >
            <img
              src={reviewIcon}
              alt="Document with magnifying glass icon"
            ></img>
            <p className="document-card__text">
              {reviewerName
                ? `Reviewing: ${reviewerName}`
                : "No current reviewer"}
            </p>
          </span>
          <p className="document-card__text">Version {version}.0</p>
          <p className="document-card__text">
            Last reviewed {timestampToDate(lastReviewed)}
          </p>
        </div>
      </div>
      <div className="document-card__actions">
        <button
          className="document-card__button-delete"
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </button>
        <Link to={`/document/${id}/edit`}>
          <button className="document-card__button-edit">Edit</button>
        </Link>
      </div>
      {isModalOpen && <DeleteModal onClick={toggleModal} id={id} />}
    </article>
  );
}

export default DocumentCard;
