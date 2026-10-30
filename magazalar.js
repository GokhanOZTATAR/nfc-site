// Yeni mağaza için aşağıdaki kayıtlardan birini çoğaltın.
// Anahtar (ör. kafe-mavi), NFC bağlantısındaki ?magaza= değeriyle aynı olmalıdır.
// Bu dosyadaki bütün bilgiler herkese açıktır. Örnek IBAN'ları yayınlamadan değiştirin.
window.MAGAZALAR = Object.freeze({
  "kafe-mavi": {
    ad: "Kafe Mavi",
    hesapSahibi: "Kafe Mavi Gıda Ticaret Ltd. Şti.",
    banka: "Örnek Banka · TL Hesabı",
    iban: "TR00 0000 0000 0000 0000 0000 01"
  },
  "yesil-atolye": {
    ad: "Yeşil Atölye",
    hesapSahibi: "Yeşil Atölye Tasarım Ltd. Şti.",
    banka: "Demo Bankası · TL Hesabı",
    iban: "TR00 0000 0000 0000 0000 0000 02"
  }
});
