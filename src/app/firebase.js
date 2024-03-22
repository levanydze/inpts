// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1kNiFHFsBgwyoy8dKQzv15lFVnDGFbUk",
  authDomain: "chacha-9137b.firebaseapp.com",
  databaseURL:
    "https://chacha-9137b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chacha-9137b",
  storageBucket: "chacha-9137b.appspot.com",
  messagingSenderId: "709224516273",
  appId: "1:709224516273:web:4db08b25f54b09a201b090",
  measurementId: "G-49FPQ0Z1NX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
