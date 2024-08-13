// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e32ab.firebaseapp.com",
  projectId: "mern-blog-e32ab",
  storageBucket: "mern-blog-e32ab.appspot.com",
  messagingSenderId: "467883513987",
  appId: "1:467883513987:web:f3da3438cad76b1cc8a3b6",
  measurementId: "G-EBYBBMKRZ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);