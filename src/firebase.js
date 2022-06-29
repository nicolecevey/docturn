import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const app = firebase.initializeApp ({
    apiKey: "AIzaSyB0giU0vr_kaswf_9ES8vDom0cC7N5mC4Y",
    authDomain: "docturn-55f85.firebaseapp.com",
    projectId: "docturn-55f85",
    storageBucket: "docturn-55f85.appspot.com",
    messagingSenderId: "49859955007",
    appId: "1:49859955007:web:a8ae81182b80121f33eb8a",
    measurementId: "G-DKBSJQS4KR"
  });

// export const documentsRef = firebase
//   .firestore()
//   .collection("documents")
//   .onSnapshot((snapshot) => {
//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     console.log("All data in 'documents' collection", data);
//   });

export const db = firebase.firestore();
// export const data = db.collection("documents")
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });

export const auth = app.auth()
export default app