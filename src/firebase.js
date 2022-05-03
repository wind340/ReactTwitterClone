// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWtlKqxByVc6Gu0IQHStzny6SACxxW5MU",
  authDomain: "reacttwitterclone-f1112.firebaseapp.com",
  projectId: "reacttwitterclone-f1112",
  storageBucket: "reacttwitterclone-f1112.appspot.com",
  messagingSenderId: "384740992103",
  appId: "1:384740992103:web:b88a26961859a7ad5ae0c2",
  measurementId: "G-NB1PP0E57K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
