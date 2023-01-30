import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'chatting-84895.firebaseapp.com',
  projectId: 'chatting-84895',
  storageBucket: 'chatting-84895.appspot.com',
  messagingSenderId: '197986988899',
  appId: '1:197986988899:web:05ae3f992edb35483ad956',
  measurementId: 'G-B2WKDDFT3L',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
