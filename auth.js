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

// ✅ קונפיגורציה תקינה כולל כל הערכים הנדרשים
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

// ✅ הרשמה
window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    localStorage.setItem("user", JSON.stringify({ email, username }));
    const status = document.getElementById("status");
    status.innerText = "נרשמת בהצלחה! נא לאשר את המייל שלך.";
    status.style.display = "block";
    status.style.background = "green";
  } catch (error) {
    const status = document.getElementById("status");
    status.innerText = "שגיאה: " + error.message;
    status.style.display = "block";
    status.style.background = "red";
  }
};

// ✅ התחברות
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      const status = document.getElementById("status");
      status.innerText = "נא לאשר את כתובת המייל לפני כניסה.";
      status.style.display = "block";
      status.style.background = "orange";
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));
    const status = document.getElementById("status");
    status.innerText = "התחברת בהצלחה!";
    status.style.display = "block";
    status.style.background = "green";

    window.location.href = "index.html";
  } catch (error) {
    const status = document.getElementById("status");
    status.innerText = "שגיאה: " + error.message;
    status.style.display = "block";
    status.style.background = "red";
  }
};

// ✅ התחברות עם גוגל
window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user", JSON.stringify({ email: user.email }));
    alert("התחברת עם Google בהצלחה!");
    window.location.href = "index.html";
  } catch (error) {
    alert("שגיאה ב־Google Sign-In: " + error.message);
  }
};
