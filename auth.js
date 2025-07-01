// auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// ✅ זה הקונפיג הנכון
const firebaseConfig = {
  apiKey: "AIzaSyBmrKqmUtv4zTggScRmKpFCD6XOT4b8gr4",
  authDomain: "crypto-abuhay.firebaseapp.com",
  projectId: "crypto-abuhay",
  storageBucket: "crypto-abuhay.appspot.com",
  messagingSenderId: "132295840726",
  appId: "1:132295840726:web:dff5437dc85ea4b54aca77",
  measurementId: "G-237S2P0HVS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🟩 הרשמה
window.register = async function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const username = document.getElementById("registerUsername").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    document.getElementById("registerMessage").innerText = "נרשמת בהצלחה, נא אמת את המייל.";
    document.getElementById("registerMessage").classList.add("success");
    document.getElementById("registerMessage").style.display = "block";
  } catch (error) {
    document.getElementById("registerMessage").innerText = error.message;
    document.getElementById("registerMessage").classList.add("error");
    document.getElementById("registerMessage").style.display = "block";
  }
};

// 🟦 התחברות
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("loginMessage").innerText = "ברוך הבא!";
    document.getElementById("loginMessage").classList.add("success");
    document.getElementById("loginMessage").style.display = "block";
    localStorage.setItem("user", JSON.stringify(userCredential.user));
  } catch (error) {
    document.getElementById("loginMessage").innerText = error.message;
    document.getElementById("loginMessage").classList.add("error");
    document.getElementById("loginMessage").style.display = "block";
  }
};

// 🟨 התחברות עם גוגל
window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("התחברת עם גוגל בהצלחה, שלום " + user.displayName);
  } catch (error) {
    alert("שגיאה בגוגל: " + error.message);
  }
};
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// פונקציית התחברות עם Face ID
window.addEventListener("DOMContentLoaded", () => {
  const faceIdBtn = document.getElementById("faceIdLoginBtn");
  if (faceIdBtn) {
    faceIdBtn.addEventListener("click", async () => {
      try {
        const cred = await navigator.credentials.get({
          publicKey: {
            challenge: new Uint8Array([0x8C, 0x7A, 0xDC, 0xAB, 0x3F, 0x4F, 0x9E, 0x11]),
            timeout: 60000,
            userVerification: "preferred"
          }
        });

        // הצלחה בזיהוי ביומטרי
        const savedEmail = localStorage.getItem("faceid_email");
        const savedPassword = localStorage.getItem("faceid_password");

        if (savedEmail && savedPassword) {
          const auth = getAuth();
          await signInWithEmailAndPassword(auth, savedEmail, savedPassword);
          alert("התחברת בהצלחה עם Face ID ✅");
          window.location.href = "home.html";
        } else {
          alert("לא נמצאו פרטי התחברות ביומטריים במכשיר הזה.");
        }
      } catch (err) {
        alert("שגיאה בזיהוי Face ID: " + err.message);
      }
    });
  }
});
