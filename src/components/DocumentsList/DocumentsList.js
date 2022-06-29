import DocumentCard from "../DocumentCard/DocumentCard";
import "./DocumentsList.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

function DocumentsList() {

  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let documentsData = [];
    db.collection("documents").get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        documentsData.push(doc.data())
      })
      setDocuments(documentsData)
      console.log(documents)
    })
  }, []);
  // let docs = docs.push(documents)

  return (
    <>
      <section className="documents-container">
        <Link 
          to="/documents/add"
          className="documents-container__link"
          >
            <button className="documents-container__button">+ Add new document</button>
        </Link>
        <ul className="documents-list">
          {documents.map(doc => {
              return (
                <li key={doc.id}>
                  <DocumentCard
                    key={doc.id}
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
