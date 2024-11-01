// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"; // Add this import
import { getFirestore } from "firebase/firestore"; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7M-bHoUajo0xd5-e-kq3oMyRfYGz4QTE",
  authDomain: "job-portal-demo-ab661.firebaseapp.com",
  projectId: "job-portal-demo-ab661",
  storageBucket: "job-portal-demo-ab661.appspot.com",
  messagingSenderId: "421124558511",
  appId: "1:421124558511:web:8e5faa31b77c7da64f4e5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);

export default app;