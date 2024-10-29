import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB9EzETD_GwmTA0oO7HtCjVUPC5InGMd1U",
  authDomain: "calendar-task-70f32.firebaseapp.com",
  projectId: "calendar-task-70f32",
  storageBucket: "calendar-task-70f32.appspot.com",
  messagingSenderId: "856645508423",
  appId: "1:856645508423:web:a73423d3f3d453b4a2c062",
  measurementId: "G-DZK6Q9GLBL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);