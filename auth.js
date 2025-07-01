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

// ✅ קונפיגורציה אמיתית לפי Firebase שלך
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

// 🔐 הרשמה
window.register = async function () {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const message = document.getElementById("registerMessage");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    message.innerText = "נרשמת בהצלחה. נשלח מייל לאימות!";
    message.className = "message-box success";
    message.style.display = "block";
  } catch (error) {
    message.innerText = "שגיאה: " + error.message;
    message.className = "message-box error";
    message.style.display = "block";
  }
};

// 🔓 התחברות
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

    localStorage.setItem("user", JSON.stringify({
      email: user.email,
      uid: user.uid
    }));

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    message.innerText = "שגיאה: " + error.message;
    message.className = "message-box error";
    message.style.display = "block";
  }
};

// 🔐 התחברות עם Google
window.googleLogin = async function () {
  const message = document.getElementById("loginMessage");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("user", JSON.stringify({
      email: user.email,
      uid: user.uid
    }));

    message.innerText = "התחברת בהצלחה עם Google!";
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
window.startFaceID = async function () {
  if (!window.PublicKeyCredential) {
    alert("המכשיר שלך לא תומך בזיהוי ביומטרי (Face ID או טביעת אצבע).");
    return;
  }

  try {
    const credential = await navigator.credentials.get({
      publicKey: {
        challenge: new Uint8Array(32),
        timeout: 60000,
        userVerification: "preferred",
        allowCredentials: []
      }
    });

    if (credential) {
      alert("הזדהית בהצלחה עם Face ID!");
      // אם תרצה, תבצע מעבר לדף הבית:
      window.location.href = "index.html";
    }
  } catch (error) {
    alert("נכשלה ההזדהות: " + error.message);
  }
};
