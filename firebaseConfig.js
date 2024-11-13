// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG1BhUDkdcxGcWbOFMqSAi1Pu2p_aHjBA",
  authDomain: "pradipblogs.firebaseapp.com",
  projectId: "pradipblogs",
  storageBucket: "pradipblogs.appspot.com",
  messagingSenderId: "513957317151",
  appId: "1:513957317151:web:4859fbba176d5920b3632a",
  measurementId: "G-PPZ44RZ983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);