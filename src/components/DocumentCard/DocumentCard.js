import "./DocumentCard.scss";
import React, { useState } from "react";
import documentIcon from "../../assets/document-128.png";
import deleteIcon from "../../assets/icons/delete_icon.svg";
import editIcon from "../../assets/icons/edit_icon.svg";
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
    <article className="document-card" id={id}>
      <div className="document-card__row">
        <img
          src={documentIcon}
          className="document-card__icon"
          alt="Document icon"
        ></img>
        <div className="document-card__details">
          <h4>{title}</h4>
          <p>Status: {status}</p>
          <p>Version: {version}.0</p>
          <p>To review: {toReview ? "Yes" : "No"}</p>
          <p>{reviewerName ? `Reviewer name: ${reviewerName}` : "No current reviewer"}</p>
          <p>Date last reviewed: {timestampToDate(lastReviewed)}</p>
        </div>
      </div>
      <div className="document-card__actions">
        {/* <img src={editIcon} className="document-card__action-icon"></img> */}
        <button
          className="document-card__button"
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </button>
        <Link to={`/document/${id}/edit`}>
          <button className="document-card__button">Edit</button>
        </Link>
      </div>
      {isModalOpen && <DeleteModal onClick={toggleModal} id={id}/>}
    </article>
  );
}

export default DocumentCard;
