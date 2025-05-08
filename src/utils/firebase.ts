import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import type { User } from '@/model';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Firebase Auth
export const firebase = initializeApp(firebaseConfig);

export const analytics = getAnalytics(firebase);

export const auth = getAuth(firebase);

export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);

export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

// Analytics
export const logMatchDetailEvent = (eventId: string, eventName: string) => {
  if (analytics) {
    firebaseLogEvent(analytics, 'view_detail', {
      event_id: eventId,
      event_name: eventName
    });
  }
};

export const logToggleBasketEvent = (
  eventId: string,
  eventName: string,
  price: number,
  type: 'add_to_cart' | 'remove_from_cart'
) => {
  if (analytics) {
    firebaseLogEvent(analytics, type, {
      event_id: eventId,
      event_name: eventName,
      price
    });
  }
};
