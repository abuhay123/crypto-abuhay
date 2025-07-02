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

// ✅ קונפיג Firebase שלך
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

// 🟩 פונקציית הרשמה
window.register = async function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const username = document.getElementById("registerUsername").value;
  const msg = document.getElementById("registerMessage");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    msg.innerText = "נרשמת בהצלחה, נא אמת את המייל.";
    msg.classList.add("success");
    msg.classList.remove("error");
    msg.style.display = "block";

    // שמור נתוני faceID
    localStorage.setItem("faceid_email", email);
    localStorage.setItem("faceid_password", password);

  } catch (error) {
    msg.innerText = error.message;
    msg.classList.add("error");
    msg.classList.remove("success");
    msg.style.display = "block";
  }
};

// 🟦 פונקציית התחברות
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMessage");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    msg.innerText = "ברוך הבא!";
    msg.classList.add("success");
    msg.classList.remove("error");
    msg.style.display = "block";
    localStorage.setItem("user", JSON.stringify(userCredential.user));

    // שמור נתוני faceID
    localStorage.setItem("faceid_email", email);
    localStorage.setItem("faceid_password", password);

  } catch (error) {
    msg.innerText = error.message;
    msg.classList.add("error");
    msg.classList.remove("success");
    msg.style.display = "block";
  }
};

// 🟨 התחברות עם Google
window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("התחברת עם גוגל בהצלחה, שלום " + user.displayName);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    alert("שגיאה בגוגל: " + error.message);
  }
};

// 🟧 התחברות עם Face ID
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

        const savedEmail = localStorage.getItem("faceid_email");
        const savedPassword = localStorage.getItem("faceid_password");

        if (savedEmail && savedPassword) {
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
function showWalletButtons() {
  try {
    const mainWindow = window.opener || window;
    const walletButtons = mainWindow.document.getElementById("walletButtons");
    if (walletButtons) {
      walletButtons.style.display = "block";
    }
  } catch (e) {
    console.warn("לא ניתן להציג כפתורי ארנק:", e);
  }
}
