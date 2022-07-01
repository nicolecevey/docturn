import DocumentCard from "../DocumentCard/DocumentCard";
import "./DocumentsList.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore";
import sortIcon from "../../assets/icons/sort-24px.svg";

function DocumentsList() {

  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const colRef = collection(db, "documents");
    const q = query(colRef, orderBy("dateLastReviewed", "desc"));
    onSnapshot(q, (snapshot) => {
      setDocuments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);


  function handleClick(){
    const colRef = collection(db, "documents");
    const q = query(colRef, where("status", "==", "open"), orderBy("dateLastReviewed", "desc"));
    onSnapshot(q, (snapshot) => {
      let documents = [];
      snapshot.docs.forEach((doc) => {
        documents.push({...doc.data(), id: doc.id})
      })
      // setDocuments(
      //   snapshot.docs.map((doc) => ({
      //     ...doc.data(),
      //     id: doc.id,
      //   }))
      // );
      setDocuments(documents)
    })
  }

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
                onClick={handleClick()} 
                className="documents-container__text documents-container__text--left"
                >Open:
                <span>{findNumDocumentsOpen()}</span>
            </p>
            <img src={sortIcon} alt="Sort icon"></img>            
            <p 
              className="documents-container__text"
              >To review:
              <span>{findNumDocumentsToReview()}</span>
            </p>
          </div>
          <Link 
            to="/documents/add"
            className="documents-container__link"
            >
              <button 
                className="documents-container__button">+ <span className="documents-container__button--tablet">Add new document</span>
              </button>
          </Link>
        </div>
        <ul className="documents-list">
          {documents.map(doc => {
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
            })
          } 
        </ul>
      </section>
    </>
  );
}

export default DocumentsList;
