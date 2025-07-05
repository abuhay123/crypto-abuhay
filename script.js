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
// שמור ב-localStorage לפי צורך

function toggleLanguage() {
  const current = localStorage.getItem("language") || "עברית";
  const next = current === "עברית" ? "English" : "עברית";
  document.getElementById("langDisplay").innerText = next;
  localStorage.setItem("language", next);
}

function changeCurrency() {
  const options = ["דולר", "שקל", "אירו"];
  let current = localStorage.getItem("currency") || "דולר";
  let next = options[(options.indexOf(current) + 1) % options.length];
  document.getElementById("currencyDisplay").innerText = next;
  localStorage.setItem("currency", next);
}

function toggleNotifications() {
  const current = localStorage.getItem("notifications") || "פעיל";
  const next = current === "פעיל" ? "כבוי" : "פעיל";
  document.getElementById("notifDisplay").innerText = next;
  localStorage.setItem("notifications", next);
}

function changeExplorer() {
  const options = ["SolScan", "Solana Explorer", "Solana Beach"];
  let current = localStorage.getItem("explorer") || "SolScan";
  let next = options[(options.indexOf(current) + 1) % options.length];
  document.getElementById("explorerDisplay").innerText = next;
  localStorage.setItem("explorer", next);
}

function changeAppIcon() {
  alert("תכונה זו תתווסף בהמשך 🎨");
}

function setBitcoinAddress() {
  const addr = prompt("הכנס כתובת ביטקוין מועדפת:");
  if (addr) {
    document.getElementById("btcAddressDisplay").innerText = addr;
    localStorage.setItem("btcAddress", addr);
  }
}

function setMotionLevel() {
  const options = ["מלא", "מופחת"];
  let current = localStorage.getItem("motion") || "מלא";
  let next = options[(options.indexOf(current) + 1) % options.length];
  document.getElementById("motionDisplay").innerText = next;
  localStorage.setItem("motion", next);
}

