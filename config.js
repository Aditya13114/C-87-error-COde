


import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDnYhu378zBXPv9dUFoeV0PWrJhrejCO4c",
  authDomain: "booksanta-85f47.firebaseapp.com",
  projectId: "booksanta-85f47",
  storageBucket: "booksanta-85f47.appspot.com",
  messagingSenderId: "780152506235",
  appId: "1:780152506235:web:c27de8067275c627f8dfde"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

