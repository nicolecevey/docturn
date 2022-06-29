import DocumentCard from "../DocumentCard/DocumentCard";
import "./DocumentsList.scss";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

function DocumentsList() {

  let arrDocs = [];

  db.collection("documents").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      arrDocs.push(doc.data())
    })
  })
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
          {arrDocs.forEach(doc => {
              return (
                <li key={doc.id}>
                  <DocumentCard
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
