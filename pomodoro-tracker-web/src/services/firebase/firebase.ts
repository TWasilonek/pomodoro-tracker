/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCRPWya_4uvvqyXBzMkPv94eekJInW1CCI',
  authDomain: 'pomodoro-tracker-f9148.firebaseapp.com',
  projectId: 'pomodoro-tracker-f9148',
  storageBucket: 'pomodoro-tracker-f9148.appspot.com',
  messagingSenderId: '90078549163',
  appId: '1:90078549163:web:c810c7a403eac39fc593ee',
  measurementId: 'G-HYXSTNNLFK',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () =>
  firebaseAuth.signInWithPopup(googleProvider);
export const signOut = () => firebaseAuth.signOut();

export default firebase;
