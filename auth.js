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

const firebaseConfig = {
  apiKey: "AIzaSyBmfKqmuUv4zTggScRmKpFCD6XOt4b8gr4",
  authDomain: "crypto-abuhay.firebaseapp.com",
  projectId: "crypto-abuhay",
  storageBucket: "crypto-abuhay.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.register = async function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const username = document.getElementById("registerUsername").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    localStorage.setItem("user", JSON.stringify({ email, username }));
    document.getElementById("registerMessage").innerText = "נרשמת בהצלחה! נא לאשר את המייל שלך.";
    document.getElementById("registerMessage").style.background = "green";
  } catch (error) {
    document.getElementById("registerMessage").innerText = "שגיאה: " + error.message;
    document.getElementById("registerMessage").style.background = "red";
  }
};

window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      document.getElementById("loginMessage").innerText = "נא לאשר את כתובת המייל לפני כניסה.";
      document.getElementById("loginMessage").style.background = "orange";
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));
    document.getElementById("loginMessage").innerText = "התחברת בהצלחה!";
    document.getElementById("loginMessage").style.background = "green";
  } catch (error) {
    document.getElementById("loginMessage").innerText = "שגיאה: " + error.message;
    document.getElementById("loginMessage").style.background = "red";
  }
};

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
