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
  const [toReviewDocuments, setReviewDocuments] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterReview, setFilterReview] = useState(false);

  useEffect(() => {

    function findNumDocumentsToReviewAndOpen() {
      const data = [];
      allDocuments.forEach((doc) => {
        if (doc.toReview === "Yes" && doc.status === "Open") {
          data.push(doc);
        }
      });
      setDocuments(data);
    }
    
    const colRef = collection(db, "documents");
    const q = query(colRef, orderBy("dateLastReviewed", "desc"));
    onSnapshot(q, (snapshot) => {
      setAllDocuments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    if(filterOpen && filterReview && filterOpen){
      return findNumDocumentsToReviewAndOpen();
    }

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
      const qReview = query(colRef, orderBy("dateLastReviewed", "desc"));
      onSnapshot(qReview, (snapshot) => {
        setReviewDocuments(
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
      const q = query(colRef,where("status", "==", "Open"), orderBy("dateLastReviewed", "desc"));
      onSnapshot(q, (snapshot) => {
        setDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    } else if (filterReview) {
      const qAll = query(colRef, orderBy("dateLastReviewed", "desc"));
      onSnapshot(qAll, (snapshot) => {
        setAllDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
      const q = query(colRef,where("toReview", "==", "Yes"), orderBy("dateLastReviewed", "desc"));
      onSnapshot(q, (snapshot) => {
        setReviewDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [filterOpen, filterReview, allDocuments]);

  function findNumDocumentsToReview() {
    let toReview = [];
    toReviewDocuments.forEach((doc) => {
      if (doc.toReview === "yes" || doc.toReview === "Yes") {
        toReview.push(doc.toReview);
      }
    });
    return toReview.length;
  }

  function findOpenDocLength() {
    return allDocuments.filter((doc)=>doc.status === 'Open').length
  }

  return (
    <>
      <section className="documents-container">
        <div className="documents-container__actions">
          <div className="documents-container__filter-row">
            <p className="documents-container__filter-title">Filter</p>
            <div className="documents-container__information">
              <p 
                className={`documents-container__text--all ${(filterOpen === false && filterReview === false) && "documents-container__text-highlight"}`}
                onClick={() => setFilterOpen(filterOpen === false) && setFilterReview(filterReview === false)}
              >All <span>({filterOpen || filterReview ? allDocuments.length : documents.length})</span></p>
              <p
                onClick={() => setFilterOpen(!filterOpen)}
                className={`documents-container__text--open ${filterOpen && "documents-container__text-highlight"}`}
              >
                Open
              <span className="documents-container__filter">{`(${findOpenDocLength()})`}</span>
              </p>
              <p 
                onClick={() => setFilterReview(!filterReview)}
                className={`documents-container__text--to-review ${filterReview && "documents-container__text-highlight"}`}
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
