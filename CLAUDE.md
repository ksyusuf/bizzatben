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

- `tailwind.config.js` Tailwind v4'te yüklenmiyor. `prog-*`, `civil-*` renk sınıfları ve `aspect-w-*` hiçbir CSS üretmiyor. Yeni renk gerekirse `index.css` içinde `@theme` kullan.
- Proje kartında opsiyonel alanlar (`link`, `github`, `prod`, `medium`) için `!= ''` yerine truthy kontrol kullan.
- `ScrollTrigger.getAll().forEach(kill)` birkaç bileşende global temizlik yapıyor; yeni animasyon eklerken `useGSAP`/`gsap.context` ile kapsamla.
- Veri dosyalarında slug'lar tutarlı olmalı (örn. `Tailwind_CSS` ve `TailwindCSS` ayrı sayfa üretir). Aynı kartta tekrarlı etiket olmamalı (React `key`).

## Geliştirme fikirleri

2026-10-12 tarihli ilk analizden. `tsc` ve build temiz, `eslint` 2 hata + 1 uyarı veriyor. Önem sırasına göre. Bir madde yapılınca buradan sil veya `[x]` ile işaretle.

### Gerçekten bozuk olanlar

- [ ] **Ölü buton (inşaat modu):** `ProjectCard.tsx` satır ~92, 109, 126, 143 `project.link != ''` gibi kontroller kullanıyor. `CivilProjects.tsx` id 3'te `link` alanı yok, `undefined != ''` true döner ve href'siz boş bir ok butonu çıkar. `ProjectDetailModal`daki gibi `project.link &&` yap.
- [ ] **Yanlış sertifika başlığı:** `CertificateList.tsx` id 13 başlığı "20. İstanbul Yarı Maraton" ama açıklama ve görsel 47. İstanbul Maratonu. Ana sayfada görünüyor.
- [ ] **Hero "Hakkımda" butonu:** `Hero.tsx` ~194, `<button>` içinde `<Link>` var; sadece yazı tıklanabilir ve HTML geçersiz. Butonu `Link` yap veya `onClick` ile `navigate`.
- [ ] **Ölü Tailwind sınıfları:** ~35 `text/bg/border/shadow-prog-*` ve `*-civil-*` kullanımı ile `aspect-w-16 aspect-h-9` (CertificateCard) çalışmıyor. Karar ver: modlara özel renkler istenen bir şeyse `index.css`'e `@theme` ile tanımla, değilse sınıfları sil. Sonra `tailwind.config.js` dosyasını sil veya `@config` ile bağla; `@tailwindcss/aspect-ratio` yerine native `aspect-video`.
- [ ] **Montserrat yüklenmiyor:** `Hero.tsx` ~41 inşaat modu alıntı fontu. Google Fonts `@import`una ekle veya başka bir font seç.
- [ ] **404 sayfası:** `App.tsx`'e `path="*"` rotası ekle. `TechProjects`'te eşleşen proje yoksa boş başlık yerine "Bulunamadı" mesajı göster.
- [ ] **`/Alll-projects` adresi:** `/projects` gibi bir adrese taşı (App.tsx, Navbar, Projects.tsx). Eski adres paylaşıldıysa `public/_redirects`'e 301 ekle.
- [ ] **Tekrarlı etiket:** `CertificateList.tsx` id 14'te `hackathon` iki kez; birini sil.

### Performans

- [ ] **Görseller ~23 MB.** Ana sayfa ~7,7 MB görsel çekiyor. En büyükler: `GDG_Zonguldak_Tema_Bagisi.png` 3,4 MB, `Motosiklet.jpg` 2,9 MB, `spor_istanbul_20...jpg` 2 MB, `Polat_Enerji...png` 1,9 MB, `cilek-final.jpg` 1,8 MB, `ilk_Yardim...png` 1,25 MB, `Python_Programlamaya...png` 1,2 MB. WebP'ye çevir, makul genişliğe küçült. `public/heisenberggg-yatay.png` (1,4 MB) OG görseli için ~1200×630'a indir.
- [ ] Tüm `<img>` etiketlerine `loading="lazy"` (ilk ekrandakiler hariç), mümkünse `width`/`height`.
- [ ] JS tek parça 603 KB (198 KB gzip). `React.lazy` ile rota bazlı bölme (AllProjects, AllCertificates, TechProjects). `ToggleButton` için styled-components yerine CSS dosyası düşünülebilir.
- [ ] Kullanılmayan bağımlılıkları sil: `@react-spring/web`, `d3-interpolate`, `@types/d3-interpolate`, `react-use-measure`.

### Paylaşım önizlemesi ve SEO (`index.html`)

- [ ] `og:image:width/height` 50×50 yazıyor, gerçek 1248×832. Düzelt veya OG görseli yeniden üretince güncelle.
- [ ] `og:image` ve `twitter:image` mutlak URL olmalı (site alan adıyla). İkisi aynı görsele işaret etmeli; `twitter:image` şu an 50×50 ikon ama kart `summary_large_image`.
- [ ] `og:url` ve `canonical` ekle. `<html lang="en">` → `tr`. Favicon `type` değeri `image/x-icon` olmalı. Geçersiz `netlify-forms` ve `publish_date` meta etiketlerini kaldır.
- [ ] Site client-side render; botlar boş görür. İstenirse prerender (ör. vite-plugin-prerender / react-snap benzeri) değerlendir.

### Kod sağlığı

- [ ] **Lint:** `ContactForm.tsx` ~185 `SubjectSelector` içindeki `any`'leri `{ id: string; name: string }` ile değiştir. `PlayStationBackground.tsx` ~87 eksik `isAnimating` bağımlılığı uyarısı.
- [ ] **Global ScrollTrigger kill:** `ContactForm`, `ContactInfo`, `ContactSection`, `programming/About`, `civil/About` içindeki `ScrollTrigger.getAll().forEach(kill)` yerine `useGSAP` + `scope` kullan.
- [ ] **PlayStationBackground:** iç içe `setTimeout`lar temizlenmiyor; hızlı mod değiştirmede yarış/titreme riski (sadece okuyarak görüldü, test edilmedi). Zamanlayıcıları ref'te tutup effect cleanup'ında temizle.
- [ ] **AllProjects:** çıkış animasyonu efekti ilk mount'ta da çalışıyor; `currentMode` gerçekten değiştiğinde çalışacak şekilde sınırla.
- [ ] **ProjectDetailModal:** `if (!project) return null` kapanış animasyonunu yutuyor; modalı her zaman render edip `show={isOpen}` ile yönet.
- [ ] `CertificateShowcase.tsx` `certificates.sort()` modül dizisini yerinde değiştiriyor; `.slice()` ekle.
- [ ] `TechProjects` iki moddaki projeleri birleştiriyor ve `key={project.id}` kullanıyor; iki listede de id `'1'..'3'` var. Şu an çakışma yok ama kırılgan, `key`e mod ekle.
- [ ] `App.tsx` içindeki `'../src/components/project/AllProjects'` import yolunu `./components/project/AllProjects` yap. `PlayStationBackground.tsx` içindeki bileşen adı `App`, yeniden adlandır. Eski yorumları düzelt (Projects.tsx "2 proje" diyor, 3 gösteriyor).
- [ ] Sertifika etiketleri `cursor-pointer` ama tıklanamıyor; ya linkle ya imleci kaldır. Ayrıca sertifika kartında tarih iki kez gösteriliyor. "Copied" mesajı Türkçe olmalı. Slug biçimi tutarsız (`fidan_bagisi` vs `gdg-zonguldak`).

### Form ve iletişim

- [ ] **Honeypot çalışmıyor:** `index.html` gizli formuna `<input name="bot-field">` ekle, `ContactForm.tsx` fetch gövdesine `bot-field` değerini dahil et.
- [ ] `NETLIFY_FORM_SETUP.md` olmayan `Contact.tsx`'e atıf yapıyor (gerçek dosya `ContactForm.tsx`). `public/_redirects` içindeki `/#contact` satırı anlamsız (fragment sunucuya gitmez), sil.
- [ ] "Mesaj Gönder" butonu (`ContactInfo.tsx`) mesaj göndermeyip KACHOW modalı açıyor; hemen yanında gerçek form var. Karar: kalsın mı, kaldırılsın mı, forma kaydırsın mı.
- [ ] Footer'da "© 2039 BizzatBen" yazıyor. Şaka değilse yılı düzelt.

### Erişilebilirlik

- [ ] `ContactForm` label'larına `htmlFor`/`id` ekle.
- [ ] Mobil hamburger butonuna `aria-label`; modal kapatma butonlarına `aria-label`.
- [ ] `ToggleButton` gizli checkbox'ı klavye odağında görünür bir odak halkası göstermiyor.
- [ ] `prefers-reduced-motion` için GSAP ve arka plan animasyonlarını azalt.
