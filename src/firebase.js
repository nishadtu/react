// import firebase from 'firebase';
import { initializeApp } from '@firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyAP62PcY3NVcQ3hCNRblBUC0c1PQzvl798",
    authDomain: "score-998ea.firebaseapp.com",
    databaseURL: "https://score-998ea-default-rtdb.firebaseio.com",
    projectId: "score-998ea",
    storageBucket: "score-998ea.appspot.com",
    messagingSenderId: "488627042337",
    appId: "1:488627042337:web:ae4492baf198a243470b60",
    measurementId: "G-454542TYY1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;