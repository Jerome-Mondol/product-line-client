import { initializeApp } from "firebase/app";
import { auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.NEXT_PUBLIC_BASE_apiKey,
  authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_authDomain,
  projectId: import.meta.env.NEXT_PUBLIC_BASE_projectId,
  storageBucket: import.meta.env.NEXT_PUBLIC_BASE_storageBucket,
  messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  appId: import.meta.env.NEXT_PUBLIC_FIREBASE_appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);