// auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase config שלך
const firebaseConfig = {
  apiKey: "AIzaSyBmfKqmuUv4zTggScRmKpFCD6XOt4b8gr4",
  authDomain: "crypto-abuhay.firebaseapp.com",
  projectId: "crypto-abuhay",
  storageBucket: "crypto-abuhay.appspot.com",
  messagingSenderId: "132295840726",
  appId: "1:132295840726:web:dff5437dc85ea4b54aca77"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🟢 פונקציית הרשמה
window.register = async function () {
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const msgBox = document.getElementById("registerMessage");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);

    localStorage.setItem("user", JSON.stringify({ email, username }));
    msgBox.innerText = "נרשמת בהצלחה! נא לאשר את כתובת האימייל.";
    msgBox.className = "message-box success";
    msgBox.style.display = "block";
  } catch (error) {
    msgBox.innerText = "שגיאה: " + error.message;
    msgBox.className = "message-box error";
    msgBox.style.display = "block";
  }
};

// 🔵 פונקציית התחברות
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msgBox = document.getElementById("loginMessage");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (!userCredential.user.emailVerified) {
      msgBox.innerText = "נא לאשר את כתובת האימייל לפני התחברות.";
      msgBox.className = "message-box warning";
      msgBox.style.display = "block";
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));
    msgBox.innerText = "התחברת בהצלחה!";
    msgBox.className = "message-box success";
    msgBox.style.display = "block";

    // ✅ מעביר לעמוד הראשי אחרי שנייה
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } catch (error) {
    msgBox.innerText = "שגיאה: " + error.message;
    msgBox.className = "message-box error";
    msgBox.style.display = "block";
  }
};

// 🟡 התחברות עם Google
window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("user", JSON.stringify({ email: user.email }));
    alert("התחברת עם Google בהצלחה!");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  } catch (error) {
    alert("שגיאה בהתחברות עם Google: " + error.message);
  }
};
