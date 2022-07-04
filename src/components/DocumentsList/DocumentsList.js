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

function DocumentsList() {
  const [documents, setDocuments] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
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
      const qAll = query(colRef, orderBy("dateLastReviewed", "desc"));
      onSnapshot(qAll, (snapshot) => {
        setAllDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
      const q = query(colRef,where("status", "==", "Open"),orderBy("dateLastReviewed", "desc"));
      onSnapshot(q, (snapshot) => {
        setDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    } else if (filterReview) {
      const q = query(colRef,where("toReview", "==", "Yes"), orderBy("dateLastReviewed", "desc"));
      onSnapshot(q, (snapshot) => {
        setDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
      const qAll = query(colRef,where("status", "==", "Open"),orderBy("dateLastReviewed", "desc"));
      onSnapshot(qAll, (snapshot) => {
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
      if (doc.status === "open" || doc.status === "Open") {
        documentsOpen.push(doc.status);
      }
    });
    return documentsOpen.length;
  }

  function findNumDocumentsToReview() {
    let toReview = [];
    documents.forEach((doc) => {
      if (doc.toReview === "yes" || doc.toReview === "Yes") {
        toReview.push(doc.toReview);
      }
    });
    return toReview.length;
  }

  return (
    <>
      <section className="documents-container">
        <div className="documents-container__actions">
          <div className="documents-container__filter-row">
            <p className="documents-container__filter-title">Filter</p>
            <div className="documents-container__information">
              <p 
                className={`documents-container__text ${(filterOpen === false && filterReview === false) && "documents-container__text-highlight"}`}
                onClick={() => setFilterOpen(filterOpen === false) && setFilterReview(filterReview === false)}
              >All <span>{filterOpen || filterReview ? allDocuments.length : documents.length}</span></p>
              <p
                onClick={() => setFilterOpen(!filterOpen)}
                className={`documents-container__text ${filterOpen && "documents-container__text-highlight"}`}
              >
                Open
              <span className="documents-container__filter">{`(${findNumDocumentsOpen()})`}</span>
              </p>
              <p 
                onClick={() => setFilterReview(!filterReview)}
                className={`documents-container__text ${filterReview && "documents-container__text-highlight"}`}
              >To review
              <span className="documents-container__filter">{`(${findNumDocumentsToReview()})`}</span>
              </p>
            </div>
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
