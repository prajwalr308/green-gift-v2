import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMrWrUWZsIq2QN47aP3cVjWvV9I-4Uh_c",
  authDomain: "green-gift-23ef3.firebaseapp.com",
  projectId: "green-gift-23ef3",
  storageBucket: "green-gift-23ef3.appspot.com",
  messagingSenderId: "744329412540",
  appId: "1:744329412540:web:a70a465e3002a983c375b9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
