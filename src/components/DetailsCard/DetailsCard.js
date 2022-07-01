// import "./DetailsCard.scss";
// import { db } from "../../firebase";
// import React, { useState, useEffect } from "react";
// import { onSnapshot, collection, query } from "firebase/firestore";

// function DetailsCard() {
// //   const [documents, setDocuments] = useState([]);

// //   useEffect(() => {
// //     const colRef = collection(db, "documents");
// //     const q = query(colRef);
// //     onSnapshot(q, (snapshot) => {
// //       setDocuments(
// //         snapshot.docs.map((doc) => ({
// //           ...doc.data(),
// //           id: doc.id,
// //         }))
// //       );
// //     });
// //     console.log(documents);
// //   }, []);

// //   function findNumDocumentsOpen() {
// //     let documentsOpen = [];
// //     documents.forEach((doc) => {
// //       if (doc.status === "open" || "Open") {
// //         documentsOpen.push(doc.status);
// //       }
// //     });
// //     return documentsOpen.length;
// //   }

// //   function findNumDocumentsToReview() {
// //     let toReview = [];
// //     documents.forEach((doc) => {
// //       if (doc.toReview === "yes" || "Yes") {
// //         toReview.push(doc.toReview);
// //       }
// //     });
// //     return toReview.length;
// //   }


//   return (
//     <article className="details-card">
//       <p className="details-card__text">Open: </p>
//       <p className="details-card__text">To review: </p>
//     </article>
//   );
// }

// export default DetailsCard;
