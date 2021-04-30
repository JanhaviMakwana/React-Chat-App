import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAYweLsqc9gxxwk0EQSVuc7k1__t-T3s3c",
    authDomain: "react-chat-app-35a3d.firebaseapp.com",
    databaseURL: "https://react-chat-app-35a3d-default-rtdb.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;

export const db = firebase.database();