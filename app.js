(() => {
  "use strict";

  const stores = window.MAGAZALAR;
  const storeView = document.getElementById("store-view");
  const messageView = document.getElementById("message-view");
  const list = document.getElementById("store-list");
  const slug = new URLSearchParams(window.location.search).get("magaza");

  function message(title, description, showStores = false) {
    document.getElementById("message-title").textContent = title;
    document.getElementById("message-text").textContent = description;
    if (showStores && stores) {
      Object.entries(stores).forEach(([key, store]) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `?magaza=${encodeURIComponent(key)}`;
        link.textContent = `${store.ad} →`;
        item.appendChild(link);
        list.appendChild(item);
      });
    }
    messageView.hidden = false;
  }

  if (!stores || typeof stores !== "object") {
    message("Bilgiler yüklenemedi", "Lütfen sayfayı yenileyin veya mağazayla iletişime geçin.");
    return;
  }
  if (!slug) {
    message("Hoş geldiniz", "Hesap bilgilerini görmek için mağazanızı seçin.", true);
    return;
  }
  if (!Object.hasOwn(stores, slug)) {
    message("Mağaza bulunamadı", "Bu bağlantıya ait bir mağaza yok. NFC kartınızı yeniden okutun veya aşağıdan mağazanızı seçin.", true);
    return;
  }

  const store = stores[slug];
  if (![store.ad, store.hesapSahibi, store.banka, store.iban].every(value => typeof value === "string" && value.trim())) {
    message("Bilgiler eksik", "Hesap bilgilerini öğrenmek için lütfen mağazayla iletişime geçin.");
    return;
  }
  const rawIban = store.iban.replace(/\s/g, "").toUpperCase();
  const ibanField = document.getElementById("iban");
  document.title = `${store.ad} · Tek Dokunuş`;
  document.getElementById("store-name").textContent = store.ad;
  document.getElementById("store-initial").textContent = Array.from(store.ad)[0].toLocaleUpperCase("tr-TR");
  document.getElementById("account-holder").textContent = store.hesapSahibi;
  document.getElementById("bank-name").textContent = store.banka;
  ibanField.value = rawIban.match(/.{1,4}/g)?.join(" ") || rawIban;
  storeView.hidden = false;

  const button = document.getElementById("copy-button");
  const status = document.getElementById("copy-status");
  button.addEventListener("click", async () => {
    button.disabled = true;
    status.textContent = "";
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(rawIban);
      status.textContent = "IBAN kopyalandı. Banka uygulamanıza yapıştırabilirsiniz.";
    } catch {
      // Eski tarayıcılar ve yerel dosya önizlemesi için yedek yöntem.
      ibanField.focus();
      ibanField.select();
      ibanField.setSelectionRange(0, ibanField.value.length);
      let copied = false;
      try { copied = document.execCommand("copy"); } catch { /* Manuel seçim korunur. */ }
      status.textContent = copied
        ? "IBAN kopyalandı. Banka uygulamanıza yapıştırabilirsiniz."
        : "Otomatik kopyalama yapılamadı. Seçili IBAN’a basılı tutup Kopyala’yı seçin.";
    } finally {
      button.disabled = false;
    }
  });
})();
