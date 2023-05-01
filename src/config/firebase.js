// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB9MRIZFZCroiT7-z3mU02_c1LDbKc79vU',
  authDomain: 'gimetix-e09a2.firebaseapp.com',
  projectId: 'gimetix-e09a2',
  storageBucket: 'gimetix-e09a2.appspot.com',
  messagingSenderId: '971427535198',
  appId: '1:971427535198:web:9c235d59c1da0ab3bb97cf',
  measurementId: 'G-JP7GFWH98T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
