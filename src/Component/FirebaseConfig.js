import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDK-IwLZvAlGYf2eErVBQgNN82j6WEjkCc",
  authDomain: "gadget-zone-3a3b7.firebaseapp.com",
  databaseURL: "https://gadget-zone-3a3b7.firebaseio.com",
  projectId: "gadget-zone-3a3b7",
  storageBucket: "gadget-zone-3a3b7.appspot.com",
  messagingSenderId: "92187424198",
  appId: "1:92187424198:web:5eab667fb28ac35fafeec7",
  measurementId: "G-YTBBMQT6BJ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export default db;
