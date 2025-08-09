// src/components/programming/DevProjects.tsx
export interface Project {
    id: string
    title: string
    description: string
    image?: string
    technologies: string[]
    link?: string
    github?: string
    prod?: string
    medium?: string
    pdfUrl?: string
    date: string
  }

export const programmingImages = import.meta.glob<{ default: string }>(
  './img/*.{png,jpg,jpeg,svg,gif}',
  { eager: true }
);

export const programmingProjects: Project[] = [
  {
    id: '1',
    title: 'Matlab Görüntü İşleme Metodu İle Bamyanın Algılanması',
    description: 'Mayıs 2022\'de 4 kişilik bir ekiple başlayan bu proje, Matlab görüntü işleme metodunu kullanarak tarladaki bamyaları algılamak üzerine odaklanmıştır. Yeşil rengi ayıklama prensibine dayanan program, resimlerin kare kare işlenmesiyle bamyayı yeşil yapraklar ve dallar arasından ayırmaktadır. Testler sonucunda %27 başarı oranı elde edilmiş, hataların (yeşil yaprak, çiçek, fide dalı, yüksek/düşük parlaklık) kaynakları detaylıca analiz edilmiştir. Çalışma 8 hafta sürmüş ve "II. INTERNATIONAL CONFERENCE ON GLOBAL PRACTICE OF MULTIDISCIPLINARY SCIENTIFIC STUDIES" konferansında sunulmuştur.',
    image: programmingImages['./img/bamya.jpg'].default,
    technologies: ['Matlab', 'Görüntü İşleme', 'Bilgisayar Görüsü', 'Veri Analizi'],
    link: 'https://www.linkedin.com/posts/yusuf-akcakaya_pdf-separation-of-okraabelmochus-esculentus-activity-6962679205675347968-6XJS?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADDxmIQB1pIq0Ba_HeCNOJTQ1lcLapQfFko',
    github: '',
    prod: '',
    medium: '',
    pdfUrl: 'https://yusufakcakaya.blogspot.com/2024/01/matlab-goruntu-isleme-metodu-ile.html',
    date: '2022-07-31',
  },
  {
    id: '2',
    title: 'Matlab İle Gerçek Zamanlı Çilek Algılayıcı',
    description: 'Matlab görüntü işleme metodu kullanılarak geliştirilen bu gerçek zamanlı çilek algılayıcı programı, tarlada test ve geliştirme aşamalarından geçmiştir. Yeşil yapraklar ve kahverengi toprak arasından kırmızı çilekleri ayırt etmeyi hedefleyen proje, aynı zamanda güçlü işlem gücü ihtiyacını optimize etmiştir. "Mavi kapak" tekniği entegre edilerek belirli kalibredeki çileklerin algılanması amaçlanmıştır. Program, çürük/çiğ çilekleri algılamayarak tutarlılığını artırmıştır. Bu çalışma, Ekim 2022\'de Şanlıurfa\'da düzenlenen "4. INTERNATIONAL GOBEKLITEPE SCIENTIFIC RESEARCH CONGRESS" konferansına yetiştirilerek başarıyla sunulmuştur.',
    image: programmingImages['./img/cilek-final.jpg'].default,
    technologies: ['Matlab', 'Görüntü İşleme', 'Gerçek Zamanlı Sistemler', 'Sensör Entegrasyonu', 'Makine Görüşü'],
    link: 'https://yusufakcakaya.blogspot.com/2024/01/matlab-ile-gercek-zamanl-cilek-alglayc.html',
    github: '',
    prod: '',
    medium: '',
    pdfUrl: '',
    date: '2022-10-15',
  },
  {
    id: '3',
    title: 'Makine Öğrenmesi İle Melbourne Ev Fiyatlarını Tahmin Etme',
    description: 'Global AI Hub ve Akbank işbirliğiyle düzenlenen Akbank Makine Öğrenmesi Bootcamp kapsamında, Muhammet Coşkun ile birlikte gerçekleştirilen bir projedir. Kaggle\'dan alınan Melbourne Housing Market veri seti kullanılarak, en yüksek doğrulukla ev fiyatlarını tahmin eden bir model geliştirilmesi amaçlanmıştır. Geliştirilen 8 model arasında en yüksek R2-Score (0.8301) Random Forest modeli ile elde edilmiştir. Bu proje, keşifsel veri analizi yeteneklerini geliştirmenin yanı sıra, makine öğrenimi modeli geliştirme süreçlerindeki önemli hususları öğrenme fırsatı sunmuştur.',
    technologies: ['Python', 'Makine Öğrenmesi', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter Notebook', 'Veri Analizi', 'Regresyon'],
    link: 'https://www.linkedin.com/posts/yusuf-akcakaya_github-ksyusufmelbourne-housing-market-ml-activity-7122291392164298753-3nO_?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADDxmIQB1pIq0Ba_HeCNOJTQ1lcLapQfFko',
    github: 'https://github.com/ksyusuf/Melbourne-Housing-Market-ML',
    prod: '',
    medium: '',
    date: '2023-12-22',
  },
  {
    id: '4',
    title: 'CIFAR100 Resim Sınıflandırma Modeli',
    description: 'Yapay Zeka, Makine Öğrenmesi ve Veri Bilimi kursu kapsamında geliştirilen bu projede, 100 farklı kategoriye ait 60 bin adet 32x32 RGB resim içeren CIFAR100 veri seti kullanılmıştır. Model, Dense katmanlarından önce 3 adet Convolution ve MaxPooling katmanı kullanılarak oluşturulmuştur. Özellikle MaxPooling katmanlarının kullanımı sayesinde, eğitilebilir parametre sayısı 44.7 Milyon’dan (170MB) yaklaşık 670 Bin’e (2.56MB) düşürülerek, işlem maliyetinden yaklaşık 68 kat kazanç sağlanmıştır. Bu proje, derin öğrenme modellerinde optimizasyonun önemini göstermektedir.',
    image: programmingImages['./img/CIFAR100-convolution-by-visualkeras.jpg'].default,
    technologies: ['Derin Öğrenme', 'Konvolüsyonel Sinir Ağları (CNN)', 'Makine Öğrenmesi', 'Python', 'Keras', 'TensorFlow', 'Görüntü İşleme'],
    link: 'https://www.linkedin.com/posts/yusuf-akcakaya_yapay-zeka-makine-%C3%B6%C4%9Frenmesi-ve-veri-bilimi-activity-7239267095203483649-68fR?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADDxmIQB1pIq0Ba_HeCNOJTQ1lcLapQfFko',
    github: '',
    prod: '',
    medium: '',
    date: '2024-09-10',
  },
  {
    id: '5',
    title: 'ÇŞİDB - Yapı Denetim Sistemi - YİBF Listesi Prototipi',
    description: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Yapı İşleri Genel Müdürlüğü\'nün mevcut Yapı Denetim Sistemi (YDS) içerisinde yer alan "YİBF Listesi" sekmesi için daha gelişmiş bir prototip versiyonudur. Proje, gerçekçi veri simülasyonu için ChatGPT ile yapay veriler oluşturmuş ve bu verileri NoSQL veritabanı simülasyonu yapan fonksiyonlarla derlemiştir. Sistem, YİBF (Yapıya İlişkin Bilgi Formu) numaralarını referans alarak işlem geçmişini takip eder, filtrelenmiş, sıralanmış ve sayfalanmış listeler sunar. Bu çalışma, sektördeki ruhsatlandırma ve yasal takip süreçlerinin dijitalleştirilmesine odaklanmaktadır.',
    image: programmingImages['./img/csb-yds.jpg'].default,
    technologies: ['React', 'Redux', 'TailwindCSS', 'Node.js', 'Express', 'CORS', 'NoSQL Simülasyonu', 'Full Stack Geliştirme'],
    link: 'https://www.linkedin.com/posts/yusuf-akcakaya_%C3%A7evre-%C5%9Fehircilik-ve-i%CC%87klim-de%C4%9Fi%C5%9Fikli%C4%9Fi-bakanl%C4%B1%C4%9F%C4%B1-activity-7251864453560864768-BcOm?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADDxmIQB1pIq0Ba_HeCNOJTQ1lcLapQfFko',
    github: 'https://github.com/ksyusuf/csb-yds-yibf-listesi',
    prod: '',
    medium: '',
    date: '2024-10-15',
  },
  {
    id: '6',
    title: 'Word Embedding Görselleştirme (2D)',
    description: 'Yapay Zeka kursunun 65. dersinde Word Embedding ve görselleştirmesi üzerine yapılan bu çalışma, kelimelerin çok boyutlu vektörler ile nasıl ifade edildiğini ve bu kavramın insan algısına uygun 2 boyutlu uzayda nasıl görselleştirildiğini inceler. Model, Amerika merkezli havayolu işletmelerine yapılan yorumlardan oluşan bir veri seti üzerinde eğitilmiş ve her epoch sonunda ortaya çıkan 2 boyutlu kelime vektör uzayının grafikleri birleştirilerek, modelin kelime vektörlerini aşamalı olarak nasıl ayrıştırdığı gösterilmiştir. Bu proje, Word Embedding kavramının karmaşıklığını ve görselleştirmenin önemini vurgulamaktadır.',
    image: programmingImages['./img/Word-Embedding-Gif-With-Twitter-US-Airline-Sentiment.jpg'].default,
    technologies: ['Doğal Dil İşleme (NLP)', 'Word Embedding', 'Boyut Azaltma', 'Makine Öğrenmesi', 'Python', 'Veri Görselleştirme'],
    link: 'https://www.linkedin.com/posts/yusuf-akcakaya_wordembedding-makineaemafbrenmesi-veribilimi-activity-7293363129080537095-zrvV?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADDxmIQB1pIq0Ba_HeCNOJTQ1lcLapQfFko',
    github: 'https://github.com/ksyusuf/65.Ders-Word-Embedding-Visualization',
    prod: '',
    medium: '',
    date: '2025-02-06',
  },
  {
    id: '7',
    title: 'NoteTut - DevOps Odaklı Açık Kaynak Not Uygulaması',
    description: 'Gerçek bir DevOps deneyimi sunmak amacıyla başlatılan açık kaynaklı not uygulaması projesidir. Temel amacı, CI/CD süreçlerini, Docker ve deployment pratiklerini uygulamalı olarak öğrenmek ve açık kaynak projelere katkıda bulunma deneyimi kazanmaktır. Proje, React.js (Frontend), Node.js/Express (Backend) ve MongoDB (Veritabanı) teknolojilerini kullanırken, DevOps süreçleri GitHub Actions ve Vercel ile yönetilmektedir. Katılımcılar, kod review, takım içi iş birliği ve endüstri standardında geliştirme pratiklerini deneyimleyebilirler. Basit bir not uygulaması üzerinden DevOps ekosisteminin tüm bileşenleri pratik olarak öğrenilmektedir.',
    image: programmingImages['./img/notetut-main-page.jpg'].default,
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'GitHub Actions', 'Vercel', 'CI/CD', 'DevOps', 'Açık Kaynak', 'Tailwind CSS', 'TypeScript', 'Jest', 'Redux', 'JWT'],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7318570175715328000/',
    github: 'https://github.com/ksyusuf/NoteTut',
    prod: 'https://notetut.vercel.app/',
    medium: '',
    date: '2025-04-08',
  },
  {
    id: '8',
    title: 'Graficast API - Yorum Görselleştirme ve Yönetim Servisi',
    description: 'PIL ve FastAPI (Python) altyapısı kullanılarak geliştirilen bu ilk API servisi, bir web sitesi üzerindeki yorumları otomatik olarak görselleştirip Google Fotoğraflar\'a kaydetme ve yönetim sürecini otomatikleştirmeyi amaçlar. Servis, ana veritabanından gelen yorum ID\'lerini alır, kendi MongoDB Atlas veritabanında (paylaşım bilgileri, farklı template\'ler için kontroller) tutar. Verilen ID ve içerik parametreleriyle yorumun resmini üretir, açıklamasıyla birlikte Google Photos API aracılığıyla Google Fotoğraflar\'a kaydeder. Ardından, ilgili yorumun "is_shared" durumunu güncelleyerek tekrarlayan paylaşımları önler. API Key ve OAuth2 (Google Photos API için) olmak üzere iki tür yetkilendirme mekanizması içerir. Dağıtımı Render.com üzerinden otomatikleştirilmiş CI/CD süreçleriyle (GitHub Actions, SemVer tabanlı versiyonlama) gerçekleştirilmiştir.',
    image: programmingImages['./img/graficast.jpg'].default,
    technologies: ['Python', 'FastAPI', 'PIL (Pillow)', 'MongoDB Atlas', 'Google Photos API', 'OAuth2', 'Render.com', 'GitHub Actions', 'CI/CD', 'Semantic Versioning (SemVer)', 'Docker', 'API Geliştirme'],
    link: 'https://www.linkedin.com/posts/yusuf-akcakaya_pillow-fastapi-python-activity-7328759144008585216-AMUv?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADDxmIQB1pIq0Ba_HeCNOJTQ1lcLapQfFko',
    github: 'https://github.com/ksyusuf/Graficast',
    prod: 'https://graficast-staging.onrender.com/docs',
    medium: 'https://medium.com/@ksyusuf85/python-fastapi-pil-ve-google-photos-api-ile-gorsel-yuklemek-aee73eec02d9',
    date: '2025-06-23',
  },
  {
    id: '9',
    title: 'MotoAnaliz - RKS R250 Yıllık Yakıt Tüketimi ve Bakım Analizi',
    description: 'RKS marka R250 motosikletin son bir yıllık yakıt tüketimi, bakım verimliliği ve maliyetlerini detaylı bir şekilde analiz eden kişisel bir veri analizi projesidir. Fuelio uygulamasından ve özel notlardan alınan veriler Python ile işlenerek kapsamlı görselleştirmeler ve raporlar hazırlanmıştır. Proje, yakıt ve kilometre başına maliyet trendlerini, yakıt tüketimi dağılımını (mesafe, ortalama/medyan, dolum tipi), mevsimsel etkileri ve bakım takibini içerir. 28 farklı grafik, detaylı Excel raporu ve kaynak kodları GitHub üzerinde mevcuttur. Bu analizler, sürüş dinamikleri hakkında kişisel çıkarımlar yapmayı sağlamıştır.',
    image: programmingImages['./img/motosiklet.jpg'].default,
    technologies: ['Python', 'Pandas', 'Matplotlib', 'NumPy', 'Veri Analizi', 'Veri Görselleştirme', 'Zaman Serisi Analizi', 'Maliyet Analizi', 'Fuelio'],
    link: 'https://www.linkedin.com/posts/yusuf-akcakaya_pandas-numpy-python-activity-7350855656133787648-B-qe?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADDxmIQB1pIq0Ba_HeCNOJTQ1lcLapQfFko',
    github: 'https://github.com/ksyusuf/MotoAnaliz',
    prod: '',
    medium: '',
    date: '2025-07-15',
  },
  {
    id: '10',
    title: 'İHA Kiralama Projesi',
    description: 'BaykarTech Akıllı Web Sistemleri Arka Uç Yazılım Uzmanı...',
    image: programmingImages['./img/IHA-AnaSayfa(ziyaretci).jpg'].default,
    technologies: ['Python', 'Django', 'PostgreSQL', 'Bootstrap', 'jQuery'],
    link: '',
    github: 'https://github.com/ksyusuf/Django-IHA-Kiralama-Projesi',
    prod: '',
    medium: '',
    date: '2024-05-06',
  }
]

export const devTechMap = programmingProjects.reduce((acc, project) => {
  project.technologies.forEach(tech => {
    if (!acc[tech]) {
      acc[tech] = []
    }
    acc[tech].push(project.id)
  })
  return acc
}, {} as Record<string, string[]>)