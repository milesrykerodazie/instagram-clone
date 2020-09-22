import firebase from 'firebase'

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyB03XeY0L2RGbXCmF7S_Ej9DFVQfuh1Hbk",
    authDomain: "instagram-clone-2a8aa.firebaseapp.com",
    databaseURL: "https://instagram-clone-2a8aa.firebaseio.com",
    projectId: "instagram-clone-2a8aa",
    storageBucket: "instagram-clone-2a8aa.appspot.com",
    messagingSenderId: "173771742377",
    appId: "1:173771742377:web:99c07e03b5907204995db8",
    measurementId: "G-LYFVG54BDQ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};