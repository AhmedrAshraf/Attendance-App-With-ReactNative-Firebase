import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBEXw6O5u1hYBZuGuEOwofa8aR3glYVkIE",
    authDomain: "native-todos.firebaseapp.com",
    databaseURL: "https://native-todos.firebaseio.com",
    projectId: "native-todos",
    storageBucket: "native-todos.appspot.com",
    messagingSenderId: "724039740638",
    appId: "1:724039740638:web:b8d124d7a6443cac"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;