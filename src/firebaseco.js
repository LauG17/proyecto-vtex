import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjOPwGEgfKAbQWk7V2UmZkPys0xg5WezE",
  authDomain: "reto-vtex.firebaseapp.com",
  databaseURL: "https://reto-vtex-default-rtdb.firebaseio.com",
  projectId: "reto-vtex",
  storageBucket: "reto-vtex.appspot.com",
  messagingSenderId: "626228690708",
  appId: "1:626228690708:web:dbed7dbf735920f877cc01",
  measurementId: "G-C17D5WNT2V"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;