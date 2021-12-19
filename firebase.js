// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    onSnapshot,
  } from "firebase/firestore";

  import {
    getStorage,
    ref,
    uploadBytes,
    uploadString,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  
  
  
 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqXg2qVH523gPhs62AxKnMoIi7QX_5O0U",
  authDomain: "kskl-59daa.firebaseapp.com",
  projectId: "kskl-59daa",
  storageBucket: "kskl-59daa.appspot.com",
  messagingSenderId: "703856993803",
  appId: "1:703856993803:web:4e674c6c6f019d951a490e"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    onSnapshot,
    storage,
    ref,
    uploadBytes,
    uploadString,
    uploadBytesResumable,
    getDownloadURL,
  };

