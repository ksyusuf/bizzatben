# Netlify Form Kurulum Rehberi

## Form Yapılandırması

Bu proje Netlify Forms kullanarak iletişim formu işlemlerini gerçekleştirir. Form gönderimleri otomatik olarak Netlify tarafından işlenir.

### Form Özellikleri

- **Form Adı**: `contact`
- **Bot Koruması**: Honeypot (`bot-field`) aktif
- **Gerekli Alanlar**: Ad Soyad, E-posta, Mesaj
- **Opsiyonel Alan**: Konu seçimi

### Netlify Dashboard Ayarları

1. **Netlify Dashboard'a Giriş**
   - Netlify hesabınıza giriş yapın
   - Projenizi seçin

2. **Form Ayarları**
   - Sol menüden "Forms" sekmesine tıklayın
   - `contact` formunu bulun

3. **E-posta Bildirimleri**
   - Form ayarlarına tıklayın
   - "Notifications" sekmesine gidin
   - "Email notifications" seçeneğini aktif edin
   - Bildirim almak istediğiniz e-posta adresini girin

4. **Form İşleme**
   - "Settings" sekmesinde form işleme seçeneklerini ayarlayın
   - Spam koruması otomatik olarak aktif

### E-posta Bildirimleri

Form gönderildiğinde şu bilgiler e-posta ile gönderilir:
- **Gönderen**: Formu dolduran kişinin adı
- **E-posta**: Formu dolduran kişinin e-posta adresi
- **Konu**: Seçilen konu (Proje Teklifi, İş Birliği, vb.)
- **Mesaj**: Gönderilen mesaj içeriği

### Hata Yönetimi

**Form Gönderim Hataları:**
- Ağ bağlantı sorunları
- Netlify servis kesintileri
- Form validasyon hataları

**Çözüm Sorumluları:**
- **Teknik Hatalar**: Geliştirici (Yusuf Akçakaya)
- **Netlify Servis Sorunları**: Netlify Support
- **E-posta Bildirim Sorunları**: Netlify Dashboard ayarları

### Test Etme

1. **Geliştirme Ortamında:**
   ```bash
   npm run dev
   ```
   - Formu doldurun ve gönderin
   - Console'da hata mesajlarını kontrol edin

2. **Canlı Ortamda:**
   - Netlify'da deploy edin
   - Formu test edin
   - Netlify Dashboard'da form gönderimlerini kontrol edin

### Güvenlik

- **Honeypot Koruması**: Bot saldırılarına karşı koruma
- **Spam Filtreleme**: Netlify otomatik spam koruması
- **Rate Limiting**: Netlify tarafından otomatik sınırlama

### Sorun Giderme

**Form Gönderilmiyor:**
1. Console'da hata mesajlarını kontrol edin
2. Netlify Dashboard'da form durumunu kontrol edin
3. Ağ bağlantısını kontrol edin

**E-posta Bildirimi Gelmiyor:**
1. Netlify Dashboard'da e-posta ayarlarını kontrol edin
2. Spam klasörünü kontrol edin
3. E-posta adresinin doğru olduğundan emin olun

**Form Validasyon Hataları:**
1. Tüm gerekli alanların doldurulduğundan emin olun
2. E-posta formatının doğru olduğunu kontrol edin
3. Mesaj alanının boş olmadığını kontrol edin
