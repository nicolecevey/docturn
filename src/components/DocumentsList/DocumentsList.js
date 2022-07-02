import DocumentCard from "../DocumentCard/DocumentCard";
import "./DocumentsList.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import sortIcon from "../../assets/icons/sort-24px.svg";

function DocumentsList() {
  const [documents, setDocuments] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterReview, setFilterReview] = useState(false);

  useEffect(() => {
    const colRef = collection(db, "documents");

    if(filterOpen === false && filterReview === false) {
      const q = query(colRef, orderBy("dateLastReviewed", "desc"));
      onSnapshot(q, (snapshot) => {
        setDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    } else if (filterOpen) {
      const q = query(colRef,where("status", "==", "open"),orderBy("dateLastReviewed", "desc"));
      onSnapshot(q, (snapshot) => {
        setDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    } else if (filterReview) {
      const q = query(colRef,where("toReview", "==", "yes"), orderBy("dateLastReviewed", "desc"));
      onSnapshot(q, (snapshot) => {
        setDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [filterOpen, filterReview]);

  function findNumDocumentsOpen() {
    let documentsOpen = [];
    documents.forEach((doc) => {
      if (doc.status === "open" || "Open") {
        documentsOpen.push(doc.status);
      }
    });
    return documentsOpen.length;
  }

  function findNumDocumentsToReview() {
    let toReview = [];
    documents.forEach((doc) => {
      if (doc.toReview === "yes" || "Yes") {
        toReview.push(doc.toReview);
      }
    });
    return toReview.length;
  }

  return (
    <>
      <section className="documents-container">
        <div className="documents-container__header">
          <div className="documents-container__information">
            <img src={sortIcon} alt="Sort icon"></img>
            <p
              onClick={() => setFilterOpen(!filterOpen)}
              className="documents-container__text documents-container__text--left"
            >
              Open
              <span>{findNumDocumentsOpen()}</span>
            </p>
            <img src={sortIcon} alt="Sort icon"></img>
            <p 
              onClick={() => setFilterReview(!filterReview)}
              className="documents-container__text"
            >To review
              <span>{findNumDocumentsToReview()}</span>
            </p>
          </div>
          <Link to="/documents/add" className="documents-container__link">
            <button className="documents-container__button">
              +{" "}
              <span className="documents-container__button--tablet">
                Add new document
              </span>
            </button>
          </Link>
        </div>
        <ul className="documents-list">
          {documents.map((doc) => {
            return (
              <li key={doc.id}>
                <DocumentCard
                  id={doc.id}
                  title={doc.title}
                  status={doc.status}
                  lastReviewed={doc.dateLastReviewed}
                  reviewerName={doc.reviewerName}
                  toReview={doc.toReview}
                  version={doc.version}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default DocumentsList;
