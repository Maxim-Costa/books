import firebase from 'firebase';

const DB_CONFIG = {
    apiKey: "AIzaSyBgKCBES-N_DhfKr-o6aRSalKQD6GyCTAg",
    authDomain: "book-20319.firebaseapp.com",
    databaseURL: "https://book-20319.firebaseio.com",
    projectId: "book-20319",
    storageBucket: "book-20319.appspot.com",
    messagingSenderId: "984626013884",
    appId: "1:984626013884:web:f85e8d99ba1d4dafa192b9",
    measurementId: "G-ME3MZHBKD5"
};

firebase.initializeApp(DB_CONFIG);
export default firebase;