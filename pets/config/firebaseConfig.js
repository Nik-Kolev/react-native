// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_API_KEY,
  authDomain: 'react-native-9e510.firebaseapp.com',
  projectId: 'react-native-9e510',
  storageBucket: 'react-native-9e510.appspot.com',
  messagingSenderId: '1032246782504',
  appId: '1:1032246782504:web:bbb3b13eedc1dea63d231d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
