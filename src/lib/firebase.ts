// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBUnmIiEIEGBapfymqOi1llnfHfou4JPIY",
  authDomain: "allina-f0012.firebaseapp.com",
  projectId: "allina-f0012",
  storageBucket: "allina-f0012.appspot.com", // FIXED: correct Firebase Storage bucket
  messagingSenderId: "592394375846",
  appId: "1:592394375846:web:4e57400a815ddf8d07da67",
  measurementId: "G-FGH7HKX60C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google provider with proper settings
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure GitHub provider
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');
githubProvider.setCustomParameters({
  allow_signup: 'true'
});
const analytics = getAnalytics(app);
