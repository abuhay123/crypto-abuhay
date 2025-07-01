// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmrKqmUtv4zTggScRmKpFCD6XOT4b8gr4",
  authDomain: "crypto-abuhay.firebaseapp.com",
  projectId: "crypto-abuhay",
  storageBucket: "crypto-abuhay.firebasestorage.app",
  messagingSenderId: "132295840726",
  appId: "1:132295840726:web:dff5437dc85ea4b54aca77",
  measurementId: "G-237S2P0HVS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

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
    alert(error.message);
  }
};

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", JSON.stringify({
      uid: userCred.user.uid,
      email: userCred.user.email
    }));
    document.getElementById("status").innerText = "התחברת בהצלחה!";
    document.getElementById("status").style.display = "block";
  } catch (error) {
    alert(error.message);
  }
};

window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }));
    document.getElementById("status").innerText = "התחברת עם גוגל בהצלחה!";
    document.getElementById("status").style.display = "block";
  } catch (error) {
    alert(error.message);
  }
};
