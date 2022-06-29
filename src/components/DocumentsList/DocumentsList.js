import DocumentCard from "../DocumentCard/DocumentCard";
import "./DocumentsList.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { orderBy } from "firebase/firestore";


function DocumentsList() {

  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let documentsData = [];
    db.collection("documents").orderBy("dateLastReviewed").get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        documentsData.push(doc.data())
      })
      setDocuments(documentsData.reverse())
      console.log(documents)
    })
  }, []);

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
                <li key={doc.key}>
                  <DocumentCard
                    key={doc.key}
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
