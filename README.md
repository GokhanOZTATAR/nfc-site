# Tek Dokunuş — NFC mağaza bilgi sitesi

Backend, derleme veya paket kurulumu gerektirmeyen, GitHub Pages üzerinde çalışabilen statik site. Her mağaza aynı HTML, CSS ve JavaScript dosyalarını kullanır.

## Dosyalar

- `index.html`: Ortak sayfa ve erişilebilir arayüz.
- `style.css`: Mobil uyumlu tasarım.
- `app.js`: URL'den mağaza seçimi ve IBAN kopyalama.
- `magazalar.js`: Mağaza kayıtları.
- `README.md`: Kurulum ve kullanım.

## Yerelde açma

`index.html` dosyasını tarayıcıda açın. Açılış ekranında iki örnek mağazadan birini seçin. İsterseniz Python kurulu bir bilgisayarda proje klasöründe `python -m http.server 8000` çalıştırıp `http://localhost:8000/?magaza=kafe-mavi` adresini açabilirsiniz.

Kopyalama öncelikle tarayıcının pano API'sini kullanır; HTTPS veya localhost üzerinde çalışır. İzin verilmezse ya da dosya doğrudan açılırsa eski kopyalama yöntemi denenir. Bu da desteklenmezse IBAN seçilir ve elle kopyalama açıklaması gösterilir.

## Mağaza ekleme

`magazalar.js` içinde bir kaydı çoğaltın. Her mağazaya benzersiz bir anahtar verin; küçük harfler, rakamlar ve tire kullanılması önerilir:

```javascript
"yeni-magaza": {
  ad: "Yeni Mağaza",
  hesapSahibi: "Hesap Sahibinin Bankadaki Tam Adı",
  banka: "Banka Adı · TL Hesabı",
  iban: "BANKANIZDAN ALDIĞINIZ GERÇEK IBAN"
}
```

Kayıtlar arasında virgül bırakın. Dosyanın başındaki `window.MAGAZALAR = Object.freeze({` ve sonundaki `});` satırlarını koruyun. Yeni mağaza için HTML dosyası oluşturmanız gerekmez.

**İki örnek mağazanın banka ve IBAN bilgileri temsilidir; ödeme için geçersizdir. Yayınlamadan önce gerçek, doğrulanmış bilgilerle değiştirin.** Uygulama banka hesabı doğrulaması veya para transferi yapmaz. Kopyalanan IBAN'daki boşluklar kaldırılır.

Markayı değiştirmek için `index.html` içindeki Tek Dokunuş metinlerini ve `app.js` içindeki sayfa başlığı metnini düzenleyin. Renkler `style.css` içindedir.

## GitHub Pages'te yayınlama

1. GitHub'da bir depo oluşturun veya mevcut deponuzu açın.
2. Bu klasörün içindeki beş dosyayı deponun kök dizinine yükleyin. `index.html` kökte bulunmalı.
3. Deponun **Settings → Pages** bölümünden dal üzerinden yayınlamayı seçin; dosyalarınızın bulunduğu dalı (genellikle `main`) ve `/ (root)` klasörünü seçip kaydedin.
4. Yayın tamamlandığında GitHub'ın verdiği HTTPS adresini açın.

Örnek proje adresi: `https://KULLANICI.github.io/DEPO/`

NFC kartlarına yazılacak tam bağlantılar:

- `https://KULLANICI.github.io/DEPO/?magaza=kafe-mavi`
- `https://KULLANICI.github.io/DEPO/?magaza=yesil-atolye`

KULLANICI ve DEPO bölümlerini kendi adresinizle değiştirin. NFC yazma uygulamasında URL/bağlantı kaydı seçip ilgili mağazanın tam adresini yazın. Kartı telefonla okutarak mağaza adını, hesap sahibini ve IBAN'ı kontrol edin. `magazalar.js` güncellendiğinde NFC kartını yeniden yazmanız gerekmez; mağaza anahtarını değiştirmediğiniz sürece bağlantı aynı kalır.

## Davranışlar

- `?magaza=...` yoksa mağaza listesi açılır.
- Bilinmeyen mağaza anahtarında açıklama ve mağaza listesi gösterilir; başka mağazanın hesabı kendiliğinden açılmaz.
- IBAN kopyalandığında sonuç mesajı görüntülenir ve ekran okuyucuya duyurulur.
- Tüm dosya yolları görecelidir; GitHub Pages alt klasörlerinde çalışır.
- Harici font, kütüphane, izleme veya ağ isteği yoktur.

Bu statik sitedeki mağaza kayıtları ve hesap bilgileri herkese açıktır. Veri dosyasına parola, API anahtarı veya özel müşteri bilgisi eklemeyin.
