# Netlify Forms Kurulumu

Bu proje Netlify Forms kullanarak iletişim formunu yönetmektedir. Form gönderimlerini alabilmek için aşağıdaki adımları takip edin:

## 1. Netlify Dashboard'da Form Detection'ı Etkinleştirin

1. Netlify Dashboard'a gidin
2. Projenizi seçin
3. **Forms** sekmesine gidin
4. **Enable form detection** butonuna tıklayın

## 2. Form Yapısı

Projede iki form yapısı bulunmaktadır:

### Hidden HTML Form (index.html)
```html
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="text" name="subject" />
  <textarea name="message"></textarea>
</form>
```

### JavaScript Form (Contact.tsx)
- React component içinde render edilen form
- AJAX ile gönderim yapar
- `data-netlify="true"` attribute'u ile işaretlenmiş

## 3. Form Alanları

Form aşağıdaki alanları içerir:
- **name**: Ad soyad
- **email**: E-posta adresi
- **subject**: Konu (dropdown)
- **message**: Mesaj

## 4. Spam Koruması

- `data-netlify-honeypot="bot-field"` ile spam koruması aktif
- Hidden input field ile bot tespiti

## 5. Başarı Mesajı

Form başarıyla gönderildiğinde modal açılır ve kullanıcıya bilgi verilir.

## 6. Hata Yönetimi

Form gönderiminde hata olursa kullanıcıya hata mesajı gösterilir.

## 7. Deployment Sonrası

Site deploy edildikten sonra:
1. Netlify Dashboard > Forms sekmesinde form görünecek
2. Form gönderimlerini buradan takip edebilirsiniz
3. E-posta bildirimleri ayarlayabilirsiniz

## 8. Test Etme

Formu test etmek için:
1. Siteyi deploy edin
2. İletişim formunu doldurun ve gönderin
3. Netlify Dashboard > Forms > Submissions'da gönderimi kontrol edin

## 9. E-posta Bildirimleri

Form gönderimlerini e-posta ile almak için:
1. Netlify Dashboard > Forms > Notifications
2. "Add notification" butonuna tıklayın
3. E-posta adresinizi ekleyin

## 10. Sorun Giderme

Form çalışmıyorsa:
1. Form detection'ın etkin olduğundan emin olun
2. Hidden HTML form'un index.html'de olduğunu kontrol edin
3. `_redirects` dosyasının mevcut olduğunu kontrol edin
4. Console'da hata mesajlarını kontrol edin
