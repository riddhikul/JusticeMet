import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACsOwiH3llQ_h2gliFUMBQRBiYhziu0Ig",
  authDomain: "legalbot-aa8c3.firebaseapp.com",
  projectId: "legalbot-aa8c3",
  storageBucket: "legalbot-aa8c3.appspot.com", // Corrected storage bucket domain
  messagingSenderId: "491188720607",
  appId: "1:491188720607:web:7fe159ff26b778273aea6a",
  measurementId: "G-BGF1S3MKDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
