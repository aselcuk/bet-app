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

export const logMatchDetailEvent = (matchId: string) => {
  if (analytics) {
    firebaseLogEvent(analytics, 'match_detail', { match_id: matchId });
  }
};

export const logAddToCartEvent = (
  itemId: string,
  itemName: string,
  price: number
) => {
  if (analytics) {
    firebaseLogEvent(analytics, 'add_to_cart', {
      item_id: itemId,
      item_name: itemName,
      price
    });
  }
};

export const logRemoveFromCartEvent = (
  itemId: string,
  itemName: string,
  price: number
) => {
  if (analytics) {
    firebaseLogEvent(analytics, 'remove_from_cart', {
      item_id: itemId,
      item_name: itemName,
      price
    });
  }
};
