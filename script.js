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
  if (elem.checked) {
    switchLang(); // ודא שפונקציית switchLang מוגדרת
  }
}
function openWhatsApp() {
  const phone = "972549665726";
  const message = "שלום, רציתי לשאול על...";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
