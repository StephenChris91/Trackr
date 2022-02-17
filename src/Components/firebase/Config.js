import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAqUWhdn-AFciIJEkvhKzhlSQTKBc6LtQA",
    authDomain: "mymoney-1c2db.firebaseapp.com",
    projectId: "mymoney-1c2db",
    storageBucket: "mymoney-1c2db.appspot.com",
    messagingSenderId: "372870852511",
    appId: "1:372870852511:web:d5c8a1b73dead25f6197aa"
};

    const firebaseApp = firebase.initializeApp(firebaseConfig);

    const db = firebaseApp.firestore();
    const dbAuth = firebase.auth();

    //timestamp
    const timestamp = firebase.firestore.Timestamp;
    export { db, dbAuth, timestamp };
    
