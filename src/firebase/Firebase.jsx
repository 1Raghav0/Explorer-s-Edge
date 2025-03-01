import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCK2TFxpC4Obb2A7CMT-fLsblwMX3ETUjs",
    authDomain: "ai-trip-planner-58d15.firebaseapp.com",
    projectId: "ai-trip-planner-58d15",
    storageBucket: "ai-trip-planner-58d15.firebasestorage.app",
    messagingSenderId: "232685752694",
    appId: "1:232685752694:web:faaaa25ee4a31c2ac76a57",
    measurementId: "G-0PQ4FYLEBT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);