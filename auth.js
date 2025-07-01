import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AlzaSyBmrKqmUtv4zTggScRmKpFCD6XOT4b8gr4",
  authDomain: "crypto-abuhay.firebaseapp.com",
  projectId: "crypto-abuhay",
  storageBucket: "crypto-abuhay.appspot.com",
  messagingSenderId: "132295840726",
  appId: "1:132295840726:web:XXXXXX" // אם חסר תוסיף את זה מהקונסול
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// הרשמה רגילה
document.getElementById("registerBtn")?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      sendEmailVerification(user);
      localStorage.setItem("user", JSON.stringify(user));
      alert("נרשמת בהצלחה! נשלח אליך מייל לאימות החשבון.");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("שגיאה בהרשמה: " + error.message);
    });
});

// התחברות רגילה
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      alert("התחברת בהצלחה!");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("שגיאה בהתחברות: " + error.message);
    });
});

// התחברות עם Google
document.getElementById("googleBtn")?.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      alert("התחברת בהצלחה עם Google!");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("שגיאה: " + error.message);
    });
});

// בדיקת התחברות אוטומטית
if (localStorage.getItem("user") && window.location.pathname.includes("auth.html")) {
  window.location.href = "home.html";
}
