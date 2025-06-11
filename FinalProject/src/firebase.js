import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// הגדרת הקונפיגורציה של Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCV6RUg6jK_LefXD_-Dr_g5pEybprq5mog",
  authDomain: "fullstack-f6ac8.firebaseapp.com",
  projectId: "fullstack-f6ac8",
  storageBucket: "fullstack-f6ac8.firebasestorage.app",
  messagingSenderId: "252816297255",
  appId: "1:252816297255:web:13c2dc0ddb63472e6cad02"
};

// אתחול של Firebase
const app = initializeApp(firebaseConfig);  // צריך לאתחל קודם את האפליקציה

// אתחול של auth ו- db אחרי אתחול האפליקציה
const auth = getAuth(app);
const db = getFirestore(app);

// יצוא של auth ו-db
export { auth, db };
