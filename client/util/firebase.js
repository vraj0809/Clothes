import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_LOGIN_API_KEY,
  authDomain: "glogin-b8cb3.firebaseapp.com",
  projectId: "glogin-b8cb3",
  storageBucket: "glogin-b8cb3.firebasestorage.app",
  messagingSenderId: "743100684748",
  appId: "1:743100684748:web:6dfeb980ae2735bd17a569",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
