import { auth ,db} from "../../firebase"; // מייבא את auth בצורה נכונה
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  query,
  where,getDocs

 
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";


export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user); // הדפס את המידע של המשתמש לצורך בדיקה

    // החזרת מידע נוסף אם יש צורך (כגון role)
    const userRef = collection(db, "user");
    const q = query(userRef, where("uid", "==", userCredential.user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { ...userCredential.user, role: userData.role }; // החזרת המידע עם ה-role
    }

    return userCredential.user; // אם אין role, מחזירים את המשתמש הבסיסי
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};





export const addUser = async (user) => {
  try {
    const usersRef = collection(db, "user");

    // בדיקה האם קיים משתמש עם אותו userName או email
    const q = query(usersRef, where("userName", "==", user.userName));
    const queryEmail = query(usersRef, where("email", "==", user.email));

    const [querySnapshot, emailSnapshot] = await Promise.all([
      getDocs(q),
      getDocs(queryEmail),
    ]);

    if (!querySnapshot.empty) {
      throw new Error("User with this username already exists.");
    }
    if (!emailSnapshot.empty) {
      throw new Error("User with this email already exists.");
    }

    // יצירת המשתמש ב-Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const newUser = userCredential.user;

    // הוספת המשתמש ל-Firestore
    const userWithRole = { ...user, role: user.role || "user", uid: newUser.uid };
    await addDoc(usersRef, userWithRole);

    return newUser;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};
