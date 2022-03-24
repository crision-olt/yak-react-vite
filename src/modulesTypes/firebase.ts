import { initializeApp } from "firebase/app";
import { getAuth }       from "firebase/auth";
import { getFirestore }  from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAa7ueGpPMllw2ajosIagXf41TcGwwQ95o",
    authDomain: "yak-react-vite.firebaseapp.com",
    projectId: "yak-react-vite",
    storageBucket: "yak-react-vite.appspot.com",
    messagingSenderId: "86394436918",
    appId: "1:86394436918:web:40b1585887dd8179fcc797",
    measurementId: "G-XCSLWNCY6E",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);