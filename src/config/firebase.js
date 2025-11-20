import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7UlHYhLuDzRKIvy-TATNaUW2sVB036yw",
  authDomain: "saude-plus-aee97.firebaseapp.com",
  projectId: "saude-plus-aee97",
  storageBucket: "saude-plus-aee97.firebasestorage.app",
  messagingSenderId: "957852499782",
  appId: "1:957852499782:web:f8d4078f5a24ae1a6faf47",
  measurementId: "G-637WCJLBEN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
