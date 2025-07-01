import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmrKqmUtv4zTggScRmKpFCD6XOT4b8gr4",
  authDomain: "crypto-abuhay.firebaseapp.com",
  projectId: "crypto-abuhay",
  storageBucket: "crypto-abuhay.appspot.com",
  messagingSenderId: "132295840726",
  appId: "1:132295840726:web:dff5437dc85ea4b54aca77"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// הרשמה
window.register = async function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const message = document.getElementById("registerMessage");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);

    message.innerText = "נרשמת בהצלחה. נשלח מייל לאימות!";
    setTimeout(() => {
  const wantsFaceID = confirm("רוצה להתחבר אוטומטית עם Face ID בפעם הבאה?");
  if (wantsFaceID) {
    localStorage.setItem("useFaceID", "true");
  }
}, 1000);
    message.className = "message-box success";
    message.style.display = "block";
  } catch (error) {
    message.innerText = "שגיאה: " + error.message;
    message.className = "message-box error";
    message.style.display = "block";
  }
};

// התחברות
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      message.innerText = "נא לאשר את כתובת האימייל לפני התחברות.";
      message.className = "message-box warning";
      message.style.display = "block";
      await signOut(auth);
      return;
    }

    message.innerText = "התחברת בהצלחה!";
    message.className = "message-box success";
    message.style.display = "block";

    // שמירת משתמש בלוקאל סטורג'
    localStorage.setItem("user", JSON.stringify({
      email: user.email,
      uid: user.uid
    }));

    // מעבר חזרה לדף הבית
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);

  } catch (error) {
    message.innerText = "שגיאה: " + error.message;
    message.className = "message-box error";
    message.style.display = "block";
  }
};

// התחברות עם גוגל
window.googleLogin = async function () {
  const message = document.getElementById("loginMessage");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("user", JSON.stringify({
      email: user.email,
      uid: user.uid
    }));

    message.innerText = "התחברת בהצלחה עם גוגל!";
    message.className = "message-box success";
    message.style.display = "block";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);

  } catch (error) {
    message.innerText = "שגיאה: " + error.message;
    message.className = "message-box error";
    message.style.display = "block";
  }
};
// התחברות עם Face ID
window.addEventListener("DOMContentLoaded", () => {
  const faceIdBtn = document.getElementById("faceIdLoginBtn");
  if (faceIdBtn) {
    faceIdBtn.addEventListener("click", async () => {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        alert("אין משתמש שמור ל-Face ID. יש להתחבר קודם עם מייל.");
        return;
      }

      try {
        const granted = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (!granted) {
          alert("Face ID לא זמין במכשיר זה.");
          return;
        }

        const confirmed = confirm("האם ברצונך להתחבר עם Face ID?");
        if (!confirmed) return;

        // סימולציה פשוטה (כי WebAuthn מלא דורש backend)
        const user = JSON.parse(savedUser);
        alert("Face ID הצליח ✅ \nברוך הבא, " + user.email);
        window.location.href = "index.html";

      } catch (e) {
        alert("שגיאה בזיהוי ביומטרי: " + e.message);
      }
    });
  }
});
