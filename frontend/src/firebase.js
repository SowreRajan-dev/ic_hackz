// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXm-rGrtrArbPvguZkLE_eSJnbiUJKois",
  authDomain: "mentree-a1c9f.firebaseapp.com",
  projectId: "mentree-a1c9f",
  storageBucket: "mentree-a1c9f.appspot.com",
  messagingSenderId: "409371798966",
  appId: "1:409371798966:web:f8e79370e57c1d388d2517",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
