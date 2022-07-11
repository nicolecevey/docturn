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
  // Component that shows all document cards and filters them according to what button user clicks
  const [documents, setDocuments] = useState([]);
  const [allDocsLength, setAllDocsLength] = useState(null);
  const [isOpenOn, setIsOpenOn] = useState(false);
  const [isReviewOn, setIsReviewOn] = useState(false);

  const fetchAllDocuments = () => {
    // Get all documents
    const colRef = collection(db, "documents");
    const q = query(colRef, orderBy("dateLastReviewed", "desc"));
    onSnapshot(q, (snapshot) => {
      const allDocs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const reviewDocs = allDocs.filter((doc) => doc.toReview === "Yes");
      const openDocs = allDocs.filter((doc) => doc.status === "Open");
      setDocuments(allDocs);
      setAllDocsLength({
        allDocuments: allDocs.length,
        reviewDocs: reviewDocs.length,
        openDocs: openDocs.length,
      });
    });
  };

  const fetchAllOpenDocuments = () => {
    //Fetch only open documents
    const colRef = collection(db, "documents");
    const q = query(
      colRef,
      where("status", "==", "Open"),
      orderBy("dateLastReviewed", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setDocuments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return;
  };

  const fetchAllReviewDocuments = () => {
    // Fetch only documents to review
    const colRef = collection(db, "documents");
    const q = query(
      colRef,
      where("toReview", "==", "Yes"),
      orderBy("dateLastReviewed", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setDocuments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  };

  const fetchAllOpenAndReviewDocuments = () => {
    // Fetch all open and all review documents
    const colRef = collection(db, "documents");
    const q = query(
      colRef,
      where("status", "==", "Open"),
      orderBy("dateLastReviewed", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const openDocs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const openAndReviewDocs = openDocs.filter(
        (doc) => doc.toReview.toLowerCase() === "yes"
      );
      setDocuments(openAndReviewDocs);
    });
  };

  useEffect(() => {
    if (isOpenOn && !isReviewOn) {
      // Fetch all open documents
      fetchAllOpenDocuments();
    } else if (isReviewOn && !isOpenOn) {
      // Fetch all review documents
      fetchAllReviewDocuments();
    } else if (isReviewOn && isOpenOn) {
      // Fetch all open and all review documents
      fetchAllOpenAndReviewDocuments();
    } else {
      // Fetch all open documents
      fetchAllDocuments();
    }
  }, [isOpenOn, isReviewOn]);

  return (
    <>
      <section className="documents-container">
        <div className="documents-container__actions">
          <div className="documents-container__filter-row">
            <p className="documents-container__filter-title">Filter</p>
            <div className="documents-container__information">
              <p
                className={`documents-container__text--all ${
                  isOpenOn === false &&
                  isReviewOn === false &&
                  "documents-container__text-highlight"
                }`}
                onClick={() => {
                  setIsOpenOn(false);
                  setIsReviewOn(false);
                  fetchAllDocuments();
                }}
              >
                All <span>({allDocsLength?.allDocuments})</span>
              </p>
              <p
                onClick={() => {
                  setIsOpenOn(!isOpenOn);
                  fetchAllOpenDocuments();
                }}
                className={`documents-container__text--open ${
                  isOpenOn && "documents-container__text-highlight"
                }`}
              >
                Open
                <span className="documents-container__filter">{`(${allDocsLength?.openDocs})`}</span>
              </p>
              <p
                className={`documents-container__text--to-review ${
                  isReviewOn && "documents-container__text-highlight"
                }`}
                onClick={() => {
                  setIsReviewOn(!isReviewOn);
                  fetchAllReviewDocuments();
                }}
              >
                To review
                <span className="documents-container__filter">{`(${allDocsLength?.reviewDocs})`}</span>
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
