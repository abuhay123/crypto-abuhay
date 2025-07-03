let currentLang = "he";

// החלפת מצב כהה/בהיר
function toggleTheme(elem) {
  if (elem.checked) {
    document.body.style.background = '#f5f5f5';
    document.body.style.color = '#000';
  } else {
    document.body.style.background = '#0c0c1d';
    document.body.style.color = '#fff';
  }
}

// החלפת שפה
function toggleLanguage(elem) {
  const newLang = elem.checked ? "en" : "he";
  setLanguage(newLang);
}

function setLanguage(lang) {
  currentLang = lang;
  const d = langData[lang];
  if (!d) return;
  document.querySelector("h1").innerText = d.title;
  document.querySelector("p").innerText = d.description;
  document.querySelector(".btn-primary").innerText = d.createWallet;
  document.querySelector(".btn-secondary").innerText = d.alreadyHaveWallet;
  document.querySelector("h2").innerText = d.supportedTokens;
  document.querySelector("#wallet-section h2").innerText = d.myWallet;
  document.querySelector("#settings h2").innerText = d.settings;
  document.querySelectorAll(".setting-row label")[0].innerText = d.themeLabel;
  document.querySelectorAll(".setting-row label")[1].innerText = d.langLabel;
  document.querySelector("#settings button").innerText = d.clearCache;
  document.querySelectorAll(".switch-label")[0].innerText = d.darkMode;
  document.querySelectorAll(".switch-label")[1].innerText = d.langSwitch;
}

window.onload = () => {
  setLanguage("he");
};

// תפריט צד
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// הצגת מפתח ציבורי ופרטי
function showPublicKey() {
  const pubKey = localStorage.getItem("publicKey") || "לא נמצא";
  document.getElementById("publicKeyDisplay").innerText = pubKey;
}
function showPrivateKey() {
  const privKey = localStorage.getItem("privateKey") || "לא נמצא";
  document.getElementById("privateKeyDisplay").innerText = privKey;
}

// שינוי סיסמה אמיתי
function changePassword() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  if (user) {
    auth.sendPasswordResetEmail(user.email).then(() => {
      alert("קישור לשינוי סיסמה נשלח למייל שלך.");
    }).catch((error) => {
      alert("שגיאה: " + error.message);
    });
  } else {
    alert("אין משתמש מחובר.");
  }
}

// תמיכה בוואטסאפ
function contactSupport() {
  const phone = "972549665726";
  const message = "שלום, יש לי שאלה על CryptoAbuhay";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// טופס תמיכה
function submitSupportForm() {
  const message = document.getElementById("supportMessage").value;
  if (!message) {
    document.getElementById("supportResponse").innerText = "אנא מלא את הטופס.";
    return;
  }
  localStorage.setItem("supportRequest", message);
  document.getElementById("supportResponse").innerText = "✅ הפנייה נשלחה ונשמרה.";
}

// בדיקת רשת פעילה
async function checkNetwork() {
  const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"), "confirmed");
  try {
    const version = await connection.getVersion();
    document.getElementById("networkStatus").innerText = "סטטוס: מחובר ✅ - " + version["solana-core"];
  } catch (e) {
    document.getElementById("networkStatus").innerText = "סטטוס: כשל בחיבור ❌";
  }
}

// קישור הפניה אישי
function copyReferral() {
  const pubKey = localStorage.getItem("publicKey") || "notfound";
  const referral = `${window.location.origin}/?ref=${pubKey}`;
  document.getElementById("referralLink").value = referral;
  navigator.clipboard.writeText(referral).then(() => {
    alert("קישור הועתק 🎉");
  });
}
