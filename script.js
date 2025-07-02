let currentLang = "he";

function toggleTheme(elem) {
  if (elem.checked) {
    document.body.style.background = '#f5f5f5';
    document.body.style.color = '#000';
  } else {
    document.body.style.background = '#0c0c1d';
    document.body.style.color = '#fff';
  }
}

function toggleLanguage(elem) {
  const newLang = elem.checked ? "en" : "he";
  setLanguage(newLang);
}

function setLanguage(lang) {
  currentLang = lang;
  const d = langData[lang];
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

function openWhatsApp() {
  const phone = "972549665726";
  const message = "שלום, רציתי לשאול על...";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

window.onload = () => {
  setLanguage("he");
};
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}
<script>
  document.getElementById("createWalletBtn").addEventListener("click", function() {
    window.location.href = "wallet.html";
  });
</script>
function showPublicKey() {
  const pubKey = localStorage.getItem("publicKey") || "לא נמצא";
  document.getElementById("publicKeyDisplay").innerText = pubKey;
}

function showPrivateKey() {
  const privKey = localStorage.getItem("privateKey") || "לא נמצא";
  document.getElementById("privateKeyDisplay").innerText = privKey;
}

function openWhatsApp() {
  window.open("https://wa.me/972501234567", "_blank");
}

function changePassword() {
  alert("קישור לשינוי סיסמה נשלח למייל (דמו)");
}
