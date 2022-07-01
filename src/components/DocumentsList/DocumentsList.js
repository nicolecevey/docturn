import DocumentCard from "../DocumentCard/DocumentCard";
import "./DocumentsList.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

function DocumentsList() {

  const [documents, setDocuments] = useState([])

  // useEffect(() => {
  //   let documentsData = [];
  //   db.collection("documents").orderBy("dateLastReviewed").get().then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       documentsData.push(...doc.data(), i:)
  //     })
  //     setDocuments(documentsData.reverse())
  //   })
  // }, []);

  useEffect(() => {
    const colRef = collection(db, "documents");
    const q = query(colRef);
    onSnapshot(q, (snapshot) => {
      setDocuments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  return (
    <>
      <section className="documents-container">
        <div className="documents-container__header">
          <div className="documents-container__information">
            <p className="documents-container__text">Open: </p>
            <p className="documents-container__text">To review: </p>
          </div>
          <Link 
            to="/documents/add"
            className="documents-container__link"
            >
              <button className="documents-container__button">+ Add new document</button>
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
