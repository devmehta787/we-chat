import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "we-chat-1c127.firebaseapp.com",
  projectId: "we-chat-1c127",
  storageBucket: "we-chat-1c127.appspot.com",
  messagingSenderId: "720537249161",
  appId: "1:720537249161:web:4c390ca7ab11dc6482ed58"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();