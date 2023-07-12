// import { initializeApp } from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAoUslCn2V6cc7MkIsU3Yi202UvQEUO8gQ",
    authDomain: "netflix-clone-319cd.firebaseapp.com",
    projectId: "netflix-clone-319cd",
    storageBucket: "netflix-clone-319cd.appspot.com",
    messagingSenderId: "1023129905487",
    appId: "1:1023129905487:web:662116f0cfa26f06adfd3a",
    measurementId: "G-TBSNT8MP8E"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;