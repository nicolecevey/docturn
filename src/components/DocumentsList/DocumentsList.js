import DocumentCard from "../DocumentCard/DocumentCard";
import "./DocumentsList.scss";
import { Link } from "react-router-dom";

function DocumentsList({ documents }) {
  console.log(documents);

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
          {documents.map(
            ({
              document_id,
              title,
              isOpen,
              last_reviewed,
              reviewer_name,
              to_review,
              version,
            }) => {
              return (
                <li key={document_id}>
                  <DocumentCard
                    title={title}
                    status={isOpen}
                    lastReviewed={last_reviewed}
                    reviewerName={reviewer_name}
                    toReview={to_review}
                    version={version}
                  />
                </li>
              );
            }
          )}
        </ul>
      </section>
    </>
  );
}

export default DocumentsList;
