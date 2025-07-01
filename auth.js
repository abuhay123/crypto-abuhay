// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// הגדרות Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmrKqmUtv4zTggScRmKpFCD6XOT4b8gr4",
  authDomain: "crypto-abuhay.firebaseapp.com",
  projectId: "crypto-abuhay",
  storageBucket: "crypto-abuhay.appspot.com",
  messagingSenderId: "132295840726",
  appId: "1:132295840726:web:dff5437dc85ea4b54aca77",
  measurementId: "G-237S2P0HVS"
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// פונקציית הרשמה
window.register = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const username = document.getElementById("username").value.trim();

  if (!email || !password || !username) {
    alert("אנא מלא את כל השדות");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", JSON.stringify({
      uid: userCred.user.uid,
      email: userCred.user.email,
      username
    }));
    document.getElementById("status").innerText = "נרשמת בהצלחה!";
    document.getElementById("status").style.display = "block";
  } catch (error) {
    alert("שגיאה בהרשמה: " + error.message);
  }
};

// פונקציית התחברות
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("אנא מלא אימייל וסיסמה");
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", JSON.stringify({
      uid: userCred.user.uid,
      email: userCred.user.email
    }));
    document.getElementById("status").innerText = "התחברת בהצלחה!";
    document.getElementById("status").style.display = "block";
  } catch (error) {
    alert("שגיאה בהתחברות: " + error.message);
  }
};

// התחברות עם Google
window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }));
    document.getElementById("status").innerText = "התחברת עם Google בהצלחה!";
    document.getElementById("status").style.display = "block";
  } catch (error) {
    alert("שגיאה בגוגל: " + error.message);
  }
};
