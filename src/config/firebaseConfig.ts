import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBT5CO_1GdH5qnalG6vhfs5vZmlD4Mdk2I",
  authDomain: "e-music-544bd.firebaseapp.com",
  projectId: "e-music-544bd",
  storageBucket: "e-music-544bd.appspot.com",
  messagingSenderId: "571105284895",
  appId: "1:571105284895:web:6d7db679692b156cff962a",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = getFirestore();
