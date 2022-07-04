import "./DocumentCard.scss";
import React, { useState } from "react";
import documentIcon from "../../assets/icons/document-icon.svg";
import reviewIcon from "../../assets/icons/review-icon.svg"
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timestampToDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <article 
      className={`
        document-card 
        ${toReview === "yes" && "document-card--highlight-border"}
        ${status === "closed" && "document-card--closed-border"}
        `} 
      id={id}>
      <div className="document-card__col">
        <div className="document-card__pills">
          <span className={`document-card__status ${status === "open" ? "document-card__status--open" : "document-card__status--closed"}`}>{status}</span>
          {(toReview === "yes") && <span className="document-card__review">To Review</span>}
        </div>
        <img
          src={documentIcon}
          className="document-card__icon"
          alt="Document icon"
        ></img>
        <div className="document-card__details">
          <h4 className="document-card__details--title">{title}</h4>
          <span className={`document-card__reviewer-pill ${toReview === "yes" && "document-card__reviewer-pill--review"}`}>
            <img src={reviewIcon}></img>
            <p className="document-card__text">{reviewerName ? `Reviewing: ${reviewerName}` : "No current reviewer"}</p>
          </span>
          <p className="document-card__text">Version {version}.0</p>
          <p className="document-card__text">Last reviewed {timestampToDate(lastReviewed)}</p>
        </div>
      </div>
      <div className="document-card__actions">
        {/* <img src={editIcon} className="document-card__action-icon"></img> */}
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
      {isModalOpen && <DeleteModal onClick={toggleModal} id={id}/>}
    </article>
  );
}

export default DocumentCard;
