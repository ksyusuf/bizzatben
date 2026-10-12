# CLAUDE.md

Kişisel portfolyo sitesi (Yusuf Akçakaya). akcakaya.me adresinde yayında (eskiden Netlify). Bu dosya, her oturumda tüm kaynağı yeniden okumamak için proje haritasını ve bekleyen geliştirme fikirlerini tutar. Önce bu dosyaya bak, sadece değişecek dosyaları oku.

## Git ve dağıtım kuralları (zorunlu)

Bu proje `main` dalından doğrudan canlıya (akcakaya.me) dağıtılır. `main`'e giden her değişiklik anında yayına çıkar.

- Tüm çalışmayı ayrı bir dalda (branch) yap. Değişiklik yapmadan önce `main` dışında bir dala geç veya yeni dal aç (ör. `fix/olu-buton`, `feat/404-sayfasi`).
- Geliştiricinin açık beyanı olmadan `main`'e asla commit, merge, rebase, cherry-pick veya push yapma. PR'ı kendin merge etme.
- Açık beyan örnekleri: "main'e merge et", "main'e gönder", "main'e push et". "Bitir", "tamam", "devam et" gibi genel onaylar main için izin sayılmaz.
- İzin tek seferliktir ve sadece belirtilen işlem için geçerlidir. Sonraki işlerde yeniden sor.
- Dal üzerindeki commit ve push serbesttir, ama geliştirici istemeden commit atma. İş bitince dalı ve yapılanları özetle, merge kararını geliştiriciye bırak.
- Dağıtım öncesi dalda `npm run build` çalıştır ve sonucu bildir.

## Teknoloji

React 19 + Vite 7 + TypeScript 5.8 (strict) + Tailwind CSS 4 (`@import "tailwindcss"`, `@tailwindcss/postcss`), GSAP (+ScrollTrigger, ScrollToPlugin, @gsap/react), Zustand, React Router 7 (BrowserRouter), Headless UI 2, heroicons, lucide-react, styled-components (sadece ToggleButton). Form: Netlify Forms. Arayüz dili Türkçe.

Komutlar: `npm run dev`, `npm run build` (tsc -b + vite build), `npm run lint`. Test yok.

## Proje haritası

- `src/App.tsx`: Router + rotalar. `/` (mod'a göre Hero, About, Projects, CertificateShowcase, ContactSection; mod değişince `key` ile komple yeniden mount), `/projects/tech/:tech`, `/Alll-projects` (yazım hatalı, bilerek bırakılmış olabilir), `/certificates`. Catch-all rota yok.
- `src/store/modeStore.ts`: Zustand, `currentMode: 'programming' | 'civil'`, `toggleMode`.
- `src/components/programming/`: `About.tsx` (yetkinlik rozetleri, `/projects/tech/<slug>` linkleri), `DevProjects.tsx` (13 proje, `devTechMap`), `DevExperiences.tsx`, `img/`.
- `src/components/civil/`: `About.tsx`, `CivilProjects.tsx` (3 proje), `CivilExperiences.tsx`, `img/`.
- `src/components/project/`: `ProjectCard.tsx` (`Project` tipi burada), `ProjectDetailModal.tsx`, `AllProjects.tsx`, `TechProjects.tsx` (iki moddaki projeleri birleştirir).
- `src/components/certificates/`: `CertificateList.tsx` (veri, 15 sertifika), `CertificateCard.tsx`, `CertificateShowcase.tsx` (son 3), `AllCertificates.tsx`, `certificate_docs/` (görseller).
- `src/components/shared/`: `Navbar`, `Footer`, `Projects` (ana sayfa vitrini, son 3 proje), `PlayStationBackground` (+ `src/assets/playstation-background.css`), `ToggleButton` (731 satır styled-components), `ScrollToTop`, `hero/` (Hero, LinkModal), `contacts/` (ContactSection, ContactInfo, ContactForm).
- `src/index.css`: Tailwind, font `@import`ları, `.glass-*`, `.animate-on-scroll`, mod geçiş overlay animasyonları.
- `index.html`: meta etiketleri + Netlify için gizli algılama formu. `public/_redirects`: SPA yönlendirmesi.
- Yeni proje/sertifika/deneyim eklemek için sadece ilgili veri dosyasına kayıt eklenir; görseller `import.meta.glob` ile yüklenir, dosya adı birebir tutmalı.

## Bilinen tuzaklar

- Tailwind v4 kullanılıyor, JS config yok (eski `tailwind.config.js` ve ölü `prog-*`/`civil-*`/`aspect-w-*` sınıfları silindi). Özel renk, font veya animasyon gerekirse `index.css` içinde `@theme` kullan; `@tailwindcss/aspect-ratio` yerine native `aspect-video` vb.
- Proje kartında opsiyonel alanlar (`link`, `github`, `prod`, `medium`) için `!= ''` yerine truthy kontrol kullan.
- `ScrollTrigger.getAll().forEach(kill)` birkaç bileşende global temizlik yapıyor; yeni animasyon eklerken `useGSAP`/`gsap.context` ile kapsamla.
- Veri dosyalarında slug'lar tutarlı olmalı (örn. `Tailwind_CSS` ve `TailwindCSS` ayrı sayfa üretir). Aynı kartta tekrarlı etiket olmamalı (React `key`).

## Sahibinin bilinçli kararları (DOKUNMA)

Bunlar hata değil, geliştiricinin kararıdır. Açıkça istenmedikçe değiştirme, "düzeltme" olarak önerme.

- `/Alll-projects` adresi kasıtlı (easter egg). Adı olduğu gibi kalsın.
- `PlayStationBackground` (ve `playstation-background.css`) emekle yazıldı, sağlıklı çalışıyor. Kritik bir sorun olmadıkça dokunma; `exhaustive-deps` uyarısı da kalsın.
- Arka plan ve geçiş animasyonları beğeniliyor; azaltma / `prefers-reduced-motion` önerme.
- Sertifika kartı görselleri kendi oranında kalır (`aspect-*` ile sabitleme yok). Görsel boyut ve oranlarına dokunma.
- Sertifika #13'ün başlığına dokunma.
- Footer'daki "© 2039 BizzatBen" Börü 2039 dizisinden bir gönderme, kasıtlı. Yılı "düzeltme".
- İnşaat modu alıntısı sistemin varsayılan `sans-serif` yazı tipiyle görünür ve bu beğeniliyor; Montserrat'a geri dönme.

## Geliştirme fikirleri

2026-10-12 tarihli analizden. Yapılan işler buradan silinir, geçmiş için git log kullanılır. Yeni madde eklerken yukarıdaki "DOKUNMA" listesine uy.

### Açık: karar veya araştırma gerekir

- [ ] **Form barındırma:** site artık Netlify'da değil (akcakaya.me). `index.html` gizli formu, `ContactForm.tsx` `data-netlify`, `public/_redirects` ve `NETLIFY_FORM_SETUP.md` Netlify Forms'a göre. Yeni barındırıcıda form çalışıyor mu doğrula; çalışmıyorsa Formspree / e-posta API'sine taşı. Netlify'a ait kalıntıları ancak o zaman temizle. (Honeypot `bot-field` eksikliği de bu karara bağlı.)
- [ ] "Mesaj Gönder" butonu (`ContactInfo.tsx`) KACHOW modalı açıyor, mesaj göndermiyor. Karar: kalsın mı?

### Açık: performans

- [ ] **Görseller ~23 MB.** Ana sayfa ~7,7 MB çekiyordu (lazy loading sonrası azalır, ölçülmedi). En büyükler: `GDG_Zonguldak_Tema_Bagisi.png` 3,4 MB, `Motosiklet.jpg` 2,9 MB, `spor_istanbul_20...jpg` 2 MB, `Polat_Enerji...png` 1,9 MB, `cilek-final.jpg` 1,8 MB. Boyut/oran değişikliği sahibinin onayıyla.
- [ ] JS tek parça ~604 KB (198 KB gzip). `React.lazy` ile rota bazlı bölme.
- [ ] Kullanılmayan bağımlılıklar: `@react-spring/web`, `d3-interpolate`, `@types/d3-interpolate`, `react-use-measure`.
- [ ] Site client-side render; botlar boş görür. İstenirse prerender.
- [ ] `public/heisenberggg-yatay.png` (OG görseli) 1,4 MB; ~1200×630'a küçültülebilir.

### Açık: kod sağlığı (hepsi düşük öncelik)

- [ ] `ScrollTrigger.getAll().forEach(kill)` `ContactForm`, `ContactInfo`, `ContactSection`, `programming/About`, `civil/About` içinde global. Şu an `key` ile komple yeniden mount edildiği için zararsız; `useGSAP` + `scope` ile kapsamlanabilir.
- [ ] `AllProjects`: çıkış animasyonu efekti ilk mount'ta da çalışıyor.
- [ ] `ProjectDetailModal`: `if (!project) return null` kapanış animasyonunu yutuyor.
- [ ] `TechProjects` iki modu birleştirip `key={project.id}` kullanıyor; iki listede de id `'1'..'3'` var (şu an çakışma yok, kırılgan).
- [ ] Sertifika etiketleri `cursor-pointer` ama tıklanamıyor; sertifika kartında tarih iki kez; slug biçimi tutarsız (`fidan_bagisi` vs `gdg-zonguldak`).
- [ ] `ToggleButton` gizli checkbox'ı klavye odağında görünür halka göstermiyor.
