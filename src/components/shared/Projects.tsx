import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef } from 'react'
import { EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  image?: string // Image alanı artık opsiyonel
  technologies: string[]
  link?: string
  github?: string
  pdfUrl?: string,
  date: string // Yeni alan: proje tarihi
}

const programmingProjects: Project[] = [
  {
    id: '1',
    title: 'Matlab Görüntü İşleme Metodu İle Bamyanın Algılanması',
    description: 'Mayıs 2022\'de 4 kişilik bir ekiple başlayan bu proje, Matlab görüntü işleme metodunu kullanarak tarladaki bamyaları algılamak üzerine odaklanmıştır. Yeşil rengi ayıklama prensibine dayanan program, resimlerin kare kare işlenmesiyle bamyayı yeşil yapraklar ve dallar arasından ayırmaktadır. Testler sonucunda %27 başarı oranı elde edilmiş, hataların (yeşil yaprak, çiçek, fide dalı, yüksek/düşük parlaklık) kaynakları detaylıca analiz edilmiştir. Çalışma 8 hafta sürmüş ve "II. INTERNATIONAL CONFERENCE ON GLOBAL PRACTICE OF MULTIDISCIPLINARY SCIENTIFIC STUDIES" konferansında sunulmuştur.',
    image: '/src/components/programming/img/bamya.jpg',
    technologies: ['Matlab', 'Görüntü İşleme', 'Bilgisayar Görüsü', 'Veri Analizi'],
    link: 'https://yusufakcakaya.blogspot.com/2024/01/matlab-goruntu-isleme-metodu-ile.html',
    // github: '',
    pdfUrl: 'https://yusufakcakaya.blogspot.com/2024/01/matlab-goruntu-isleme-metodu-ile.html', // Eğer PDF linki varsa
    date: '2022-07-31' 
  },
  {
    id: '2',
    title: 'Matlab İle Gerçek Zamanlı Çilek Algılayıcı',
    description: 'Matlab görüntü işleme metodu kullanılarak geliştirilen bu gerçek zamanlı çilek algılayıcı programı, tarlada test ve geliştirme aşamalarından geçmiştir. Yeşil yapraklar ve kahverengi toprak arasından kırmızı çilekleri ayırt etmeyi hedefleyen proje, aynı zamanda güçlü işlem gücü ihtiyacını optimize etmiştir. "Mavi kapak" tekniği entegre edilerek belirli kalibredeki çileklerin algılanması amaçlanmıştır. Program, çürük/çiğ çilekleri algılamayarak tutarlılığını artırmıştır. Bu çalışma, Ekim 2022\'de Şanlıurfa\'da düzenlenen "4. INTERNATIONAL GOBEKLITEPE SCIENTIFIC RESEARCH CONGRESS" konferansına yetiştirilerek başarıyla sunulmuştur.',
    image: '/src/components/programming/img/cilek-final.jpg',
    technologies: ['Matlab', 'Görüntü İşleme', 'Gerçek Zamanlı Sistemler', 'Sensör Entegrasyonu', 'Makine Görüşü'],
    link: 'https://yusufakcakaya.blogspot.com/2024/01/matlab-ile-gercek-zamanl-cilek-alglayc.html',
    // github: '',
    pdfUrl: 'https://yusufakcakaya.blogspot.com/2024/01/matlab-ile-gercek-zamanl-cilek-alglayc.html', // Eğer PDF linki varsa
    date: '2022-10-15' 
  },
  {
  id: '3',
    title: 'Makine Öğrenmesi İle Melbourne Ev Fiyatlarını Tahmin Etme',
    description: 'Global AI Hub ve Akbank işbirliğiyle düzenlenen Akbank Makine Öğrenmesi Bootcamp kapsamında, Muhammet Coşkun ile birlikte gerçekleştirilen bir projedir. Kaggle\'dan alınan Melbourne Housing Market veri seti kullanılarak, en yüksek doğrulukla ev fiyatlarını tahmin eden bir model geliştirilmesi amaçlanmıştır. Geliştirilen 8 model arasında en yüksek R2-Score (0.8301) Random Forest modeli ile elde edilmiştir. Bu proje, keşifsel veri analizi yeteneklerini geliştirmenin yanı sıra, makine öğrenimi modeli geliştirme süreçlerindeki önemli hususları öğrenme fırsatı sunmuştur.',
    // image: '/api/placeholder/400/300', // İsteğe bağlı olarak bir görsel yolu ekleyebilirsiniz
    technologies: ['Python', 'Makine Öğrenmesi', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter Notebook', 'Veri Analizi', 'Regresyon'],
    link: 'https://github.com/ksyusuf/Melbourne-Housing-Market-ML', // Projenin GitHub linki
    github: 'https://github.com/ksyusuf/Melbourne-Housing-Market-ML', // GitHub linki tekrar
    // pdfUrl: '', // Eğer PDF raporu varsa buraya eklenebilir
    date: '2023-12-01' // Bootcamp bitişi veya proje teslimi için tahmini bir tarih
  },
  {
    id: '4',
    title: 'CIFAR100 Resim Sınıflandırma Modeli',
    description: 'Yapay Zeka, Makine Öğrenmesi ve Veri Bilimi kursu kapsamında geliştirilen bu projede, 100 farklı kategoriye ait 60 bin adet 32x32 RGB resim içeren CIFAR100 veri seti kullanılmıştır. Model, Dense katmanlarından önce 3 adet Convolution ve MaxPooling katmanı kullanılarak oluşturulmuştur. Özellikle MaxPooling katmanlarının kullanımı sayesinde, eğitilebilir parametre sayısı 44.7 Milyon’dan (170MB) yaklaşık 670 Bin’e (2.56MB) düşürülerek, işlem maliyetinden yaklaşık 68 kat kazanç sağlanmıştır. Bu proje, derin öğrenme modellerinde optimizasyonun önemini göstermektedir.',
    image: '/src/components/programming/img/CIFAR100-convolution-by-visualkeras.png', // Belirtilen görsel yolu
    technologies: ['Derin Öğrenme', 'Konvolüsyonel Sinir Ağları (CNN)', 'Makine Öğrenmesi', 'Python', 'Keras', 'TensorFlow', 'Görüntü İşleme'],
    link: 'https://github.com/ksyusuf/Yapay_Zeka-Makine_Ogrenmesi-Veri_Bilimi-Kursum/blob/main/Kurs%20%C4%B0lerlemem.md',
    github: 'https://github.com/ksyusuf/Yapay_Zeka-Makine_Ogrenmesi-Veri_Bilimi-Kursum', // Projenin ana GitHub reposu
    // pdfUrl: '', // Eğer varsa projenin bir PDF raporu eklenebilir
    date: '2025-07-28' // Yaklaşık tarih, dersin 57. ders olduğu düşünülerek bu tarih verildi
  },
  {
    id: '5',
    title: 'ÇŞİDB - Yapı Denetim Sistemi - YİBF Listesi Prototipi',
    description: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Yapı İşleri Genel Müdürlüğü\'nün mevcut Yapı Denetim Sistemi (YDS) içerisinde yer alan "YİBF Listesi" sekmesi için daha gelişmiş bir prototip versiyonudur. Proje, gerçekçi veri simülasyonu için ChatGPT ile yapay veriler oluşturmuş ve bu verileri NoSQL veritabanı simülasyonu yapan fonksiyonlarla derlemiştir. Sistem, YİBF (Yapıya İlişkin Bilgi Formu) numaralarını referans alarak işlem geçmişini takip eder, filtrelenmiş, sıralanmış ve sayfalanmış listeler sunar. Bu çalışma, sektördeki ruhsatlandırma ve yasal takip süreçlerinin dijitalleştirilmesine odaklanmaktadır.',
    image: '/src/components/programming/img/csb-yds.jpeg',
    technologies: ['React', 'Redux', 'TailwindCSS', 'Node.js', 'Express', 'CORS', 'NoSQL Simülasyonu', 'Full Stack Geliştirme'],
    link: 'https://github.com/ksyusuf/csb-yds-yibf-listesi',
    github: 'https://github.com/ksyusuf/csb-yds-yibf-listesi',
    // pdfUrl: '', // Eğer varsa projenin bir PDF raporu eklenebilir
    date: '2025-08-03' // Bugünün tarihi (proje tamamlanma tarihi olarak kabul edildi)
  },
  {
  id: '6',
  title: 'Word Embedding Görselleştirme (2D)',
  description: 'Yapay Zeka kursunun 65. dersinde Word Embedding ve görselleştirmesi üzerine yapılan bu çalışma, kelimelerin çok boyutlu vektörler ile nasıl ifade edildiğini ve bu kavramın insan algısına uygun 2 boyutlu uzayda nasıl görselleştirildiğini inceler. Model, Amerika merkezli havayolu işletmelerine yapılan yorumlardan oluşan bir veri seti üzerinde eğitilmiş ve her epoch sonunda ortaya çıkan 2 boyutlu kelime vektör uzayının grafikleri birleştirilerek, modelin kelime vektörlerini aşamalı olarak nasıl ayrıştırdığı gösterilmiştir. Bu proje, Word Embedding kavramının karmaşıklığını ve görselleştirmenin önemini vurgulamaktadır.',
  image: '/src/components/programming/img/Word-Embedding-Gif-With-Twitter-US-Airline-Sentiment.gif', // Belirtilen gif yolu
  technologies: ['Doğal Dil İşleme (NLP)', 'Word Embedding', 'Boyut Azaltma', 'Makine Öğrenmesi', 'Python', 'Veri Görselleştirme'],
  link: 'https://github.com/ksyusuf/65.Ders-Word-Embedding-Visualization',
  github: 'https://github.com/ksyusuf/65.Ders-Word-Embedding-Visualization',
  // pdfUrl: '', // Eğer varsa projenin bir PDF raporu eklenebilir
  date: '2025-08-03' // Bugünün tarihi (projenin paylaşılma tarihi olarak kabul edildi)
},
{
  id: '7',
  title: 'NoteTut - DevOps Odaklı Açık Kaynak Not Uygulaması',
  description: 'Gerçek bir DevOps deneyimi sunmak amacıyla başlatılan açık kaynaklı not uygulaması projesidir. Temel amacı, CI/CD süreçlerini, Docker ve deployment pratiklerini uygulamalı olarak öğrenmek ve açık kaynak projelere katkıda bulunma deneyimi kazanmaktır. Proje, React.js (Frontend), Node.js/Express (Backend) ve MongoDB (Veritabanı) teknolojilerini kullanırken, DevOps süreçleri GitHub Actions ve Vercel ile yönetilmektedir. Katılımcılar, kod review, takım içi iş birliği ve endüstri standardında geliştirme pratiklerini deneyimleyebilirler. Basit bir not uygulaması üzerinden DevOps ekosisteminin tüm bileşenleri pratik olarak öğrenilmektedir.',
  image: '/src/components/programming/img/notetut-main-page.png', // Belirtilen görsel yolu
  technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'GitHub Actions', 'Vercel', 'CI/CD', 'DevOps', 'Açık Kaynak', 'Tailwind CSS', 'TypeScript', 'Jest', 'Redux', 'JWT'],
  link: 'https://notetut.vercel.app/', // Canlı bağlantı
  github: 'https://github.com/ksyusuf/NoteTut', // GitHub Repo
  // pdfUrl: '', // Eğer varsa projenin bir PDF raporu eklenebilir
  date: '2025-08-03' // Bugünün tarihi (projenin başlatılma/paylaşılma tarihi olarak kabul edildi)
},
{
  id: '8',
  title: 'Graficast API - Yorum Görselleştirme ve Yönetim Servisi',
  description: 'PIL ve FastAPI (Python) altyapısı kullanılarak geliştirilen bu ilk API servisi, bir web sitesi üzerindeki yorumları otomatik olarak görselleştirip Google Fotoğraflar\'a kaydetme ve yönetim sürecini otomatikleştirmeyi amaçlar. Servis, ana veritabanından gelen yorum ID\'lerini alır, kendi MongoDB Atlas veritabanında (paylaşım bilgileri, farklı template\'ler için kontroller) tutar. Verilen ID ve içerik parametreleriyle yorumun resmini üretir, açıklamasıyla birlikte Google Photos API aracılığıyla Google Fotoğraflar\'a kaydeder. Ardından, ilgili yorumun "is_shared" durumunu güncelleyerek tekrarlayan paylaşımları önler. API Key ve OAuth2 (Google Photos API için) olmak üzere iki tür yetkilendirme mekanizması içerir. Dağıtımı Render.com üzerinden otomatikleştirilmiş CI/CD süreçleriyle (GitHub Actions, SemVer tabanlı versiyonlama) gerçekleştirilmiştir.',
  image: '/src/components/programming/img/graficast.png', // Belirtilen görsel yolu
  technologies: ['Python', 'FastAPI', 'PIL (Pillow)', 'MongoDB Atlas', 'Google Photos API', 'OAuth2', 'Render.com', 'GitHub Actions', 'CI/CD', 'Semantic Versioning (SemVer)', 'Docker', 'API Geliştirme'],
  link: 'https://graficast-staging.onrender.com/docs', // Canlı bağlantı
  github: 'https://github.com/ksyusuf/Graficast', // GitHub Repo
  // pdfUrl: '', // Eğer varsa projenin bir PDF raporu eklenebilir
  date: '2025-08-03' // Bugünün tarihi (projenin yayına alınma/paylaşılma tarihi olarak kabul edildi)
},
{
  id: '9',
  title: 'MotoAnaliz - RKS R250 Yıllık Yakıt Tüketimi ve Bakım Analizi',
  description: 'RKS marka R250 motosikletin son bir yıllık yakıt tüketimi, bakım verimliliği ve maliyetlerini detaylı bir şekilde analiz eden kişisel bir veri analizi projesidir. Fuelio uygulamasından ve özel notlardan alınan veriler Python ile işlenerek kapsamlı görselleştirmeler ve raporlar hazırlanmıştır. Proje, yakıt ve kilometre başına maliyet trendlerini, yakıt tüketimi dağılımını (mesafe, ortalama/medyan, dolum tipi), mevsimsel etkileri ve bakım takibini içerir. 28 farklı grafik, detaylı Excel raporu ve kaynak kodları GitHub üzerinde mevcuttur. Bu analizler, sürüş dinamikleri hakkında kişisel çıkarımlar yapmayı sağlamıştır.',
  image: '/src/components/programming/img/motosiklet.jpg', // Belirtilen görsel yolu
  technologies: ['Python', 'Pandas', 'Matplotlib', 'NumPy', 'Veri Analizi', 'Veri Görselleştirme', 'Zaman Serisi Analizi', 'Maliyet Analizi', 'Fuelio'],
  link: 'https://github.com/ksyusuf/RKS-R250-Yillik-Kullanim-Analizi', // GitHub Repo
  github: 'https://github.com/ksyusuf/RKS-R250-Yillik-Kullanim-Analizi', // GitHub Repo tekrar
  // pdfUrl: '', // Eğer Excel raporunun direkt indirilebilir linki veya ayrı bir PDF varsa buraya eklenebilir
  date: '2025-08-03' // Bugünün tarihi (projenin paylaşılma tarihi olarak kabul edildi)
}
];

const civilProjects: Project[] = [
  {
    id: '1',
    title: 'Centre Pompidou Araştırması',
    description: 'Nisan 2019\'da İnşaat Mühendisliği lisansım sırasında Mühendisliğe Giriş dersi için hazırladığım kapsamlı bir araştırma projesidir. Bu çalışmada, ikonik Pompidou Merkezi binasının teknik yapısı derinlemesine incelenmiştir. Yapının mimari ve mühendislik özellikleri detaylandırılarak, merkezin teknik detaylarına dair merakları gidermeyi hedeflemektedir.',
    image: '/src/components/civil/img/pompidou.jpg',
    technologies: ['Mimari Analiz', 'Yapı Mühendisliği', 'Mühendisliğe Giriş'],
    link: 'https://yusufakcakaya.blogspot.com/2019/04/centre-pompidou.html',
    // pdfUrl: 'PDF_LINKI_BURAYA', // Eğer projenin bir PDF raporu varsa
    date: '20.04.2019'
  },
  {
    id: '2',
    title: 'Betonarme Bitirme Projesi',
    description: '2020-2021 Güz Döneminde tamamlanan betonarme bitirme projesi. Proje, betonarme tasarımı ve uygulama detaylarına odaklanmaktadır. Projenin kaynakları incelenerek fark edilen bazı hatalar ve düzeltme gereksinimleri de açıklanmıştır.',
    image: '/src/components/civil/img/betonarme-projem.png',
    technologies: ['Betonarme Tasarım İlkeleri', 'Yapı Statiği', 'TS 500'],
    link: 'https://yusufakcakaya.blogspot.com/2021/02/betonarme-projem.html',
    pdfUrl: 'https://yusufakcakaya.blogspot.com/2021/02/betonarme-projem.html',
    date: '26.02.2021'
  },
  {
    id: '3',
    title: 'Veri Analizi Projem (Kıbrıs Rüzgar & Buharlaşma Analizi)',
    description: '2020-2021 Bahar Döneminde Kıbrıs Ercan Havalimanı ve Orta Mesarya bölgesinden elde edilen rüzgâr hızları ve buharlaşma miktarları kullanılarak gerçekleştirilmiş bitirme projesi. Bu analizde, bölgenin rüzgâr hızları ve buharlaşma miktarlarının dağılımları ile birbirleriyle olan ilişkileri incelenerek, rüzgar türbini yapılması konusunda çıkarımlarda bulunulmuştur. Keşifsel veri analizi R programlama dili kullanılarak yaklaşık 14 haftada tamamlanmıştır. Proje, bilimsel makale formatı konusunda önemli deneyimler kazandırmıştır.',
    // image: '/src/components/civil/img/veri-analizi-placeholder.png',
    technologies: ['R Programlama Dili', 'Keşifsel Veri Analizi', 'İstatistiksel Analiz', 'Rüzgar Enerjisi'],
    // link: 'PROJE_LINKI_BURAYA',
    github: "https://github.com/ksyusuf/KVA-Projem",
    // pdfUrl: 'PDF_LINKI_BURAYA',
    date: '03.07.2021'
  }
]

export default function Projects() {
  const { currentMode } = useModeStore()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = currentMode === 'programming' ? programmingProjects : civilProjects

  // GSAP refs
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Başlık animasyonu (scrollTrigger ile)
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    // Açıklama animasyonu (scrollTrigger ile)
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    // Kartlar: sadece her biri için scrollTrigger ile animasyon (stagger efekti için delay kullan)
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.4 + i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 98%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [currentMode, projects])

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className={`text-4xl font-bold mb-4 ${
            currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
          }`}>
            Projeler
          </h2>
          <p ref={descRef} className={`text-xl max-w-3xl mx-auto ${
            currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
          }`}>
            {currentMode === 'programming' 
              ? 'Geliştirdiğim yazılım projeleri ve teknoloji çözümleri'
              : 'Tasarladığım yapı projeleri ve mühendislik çözümleri'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice().reverse().map((project, index) => (
            <div
              key={project.id}
              ref={el => { cardsRef.current[index] = el; }}
            >
              <ProjectCard 
                project={project}
                index={index}
                currentMode={currentMode}
                onViewDetails={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        currentMode={currentMode}
      />
    </section>
  )
}

function ProjectCard({ 
  project, 
  index, 
  currentMode, 
  onViewDetails 
}: { 
  project: Project
  index: number
  currentMode: string
  onViewDetails: () => void
}) {

  // Açıklamayı kesmek için yardımcı fonksiyon
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return { truncatedText: text, isTruncated: false };
    }
    // Son boşluğa kadar kesip üç nokta ekle
    const truncated = text.substring(0, maxLength).trim();
    return { truncatedText: truncated + '...', isTruncated: true };
  };

  const { truncatedText, isTruncated } = truncateDescription(project.description, 200);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border hover:scale-105 transition-all duration-300"
    >
      {/* Project Image or Icon Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover absolute inset-0" 
          />
        ) : (
          <div className="text-6xl">
            {currentMode === 'programming' ? '💻' : '🏗️'}
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${
          currentMode === 'programming' 
            ? 'from-prog-darker/80 to-transparent' 
            : 'from-civil-darker/80 to-transparent'
        }`} />
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 ${
          currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
        }`}>
          {project.title}
        </h3>
        {/* AÇIKLAMA ALANI GÜNCELLENDİ */}
        <p className={`text-sm mb-4 ${
          currentMode === 'programming' ? 'text-prog-light/80' : 'text-civil-light/80'
        }`}>
          {truncatedText}
          {isTruncated && (
            <button 
              onClick={onViewDetails} 
              className={`ml-1 font-semibold underline decoration-dotted decoration-1 underline-offset-2 cursor-pointer ${
                currentMode === 'programming' ? 'text-prog-accent hover:text-prog-neon' : 'text-civil-amber hover:text-civil-gold'
              } focus:outline-none`}
            >
              Devamını Gör
            </button>
          )}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentMode === 'programming'
                  ? 'bg-prog-primary/20 text-prog-accent'
                  : 'bg-civil-primary/20 text-civil-amber'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="absolute bottom-6 right-6">
          <span className={`text-xs font-medium ${
            currentMode === 'programming' ? 'text-prog-light-rgb-60' : 'text-civil-light-rgb-60'
          }`}>
            {project.date}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onViewDetails}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer backdrop-blur-xl ${
              currentMode === 'programming'
                ? 'bg-prog-primary/20 text-prog-accent hover:bg-prog-primary/30 hover:border hover:border-prog-accent/20'
                : 'bg-civil-primary/20 text-civil-amber hover:bg-civil-primary/30 hover:border hover:border-civil-amber/20'
            }`}
          >
            <EyeIcon className="w-4 h-4" />
            Detaylar
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer backdrop-blur-xl ${
                currentMode === 'programming'
                  ? 'bg-prog-dark/50 text-prog-light hover:bg-prog-dark/70 hover:border hover:border-prog-primary/20'
                  : 'bg-civil-dark/50 text-civil-light hover:bg-civil-dark/70 hover:border hover:border-civil-primary/20'
              }`}
            >
              <CodeBracketIcon className="w-4 h-4" />
              Kod
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectModal({ 
  project, 
  isOpen, 
  onClose, 
  currentMode 
}: { 
  project: Project | null
  isOpen: boolean
  onClose: () => void
  currentMode: string 
}) {
  if (!project) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-4xl transform overflow-hidden rounded-2xl backdrop-blur-xl border ${
                currentMode === 'programming' 
                  ? 'bg-prog-darker/90 border-prog-neon/30' 
                  : 'bg-civil-darker/90 border-civil-gold/30'
              } p-6 text-left align-middle shadow-xl transition-all`}>
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title className={`text-3xl font-bold ${
                    currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                  }`}>
                    {project.title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
                      currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                    }`}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Image or Icon Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover rounded-lg" // Added rounded-lg to image
                      />
                    ) : (
                      <div className={`text-8xl ${
                        currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                      }`}>
                        {currentMode === 'programming' ? '💻' : '🏗️'}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <p className={`text-lg mb-6 ${
                      currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                    }`}>
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className={`text-lg font-semibold mb-3 ${
                        currentMode === 'programming' ? 'text-prog-accent' : 'text-civil-amber'
                      }`}>
                        Kullanılan Teknolojiler
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              currentMode === 'programming'
                                ? 'bg-prog-primary/20 text-prog-accent'
                                : 'bg-civil-primary/20 text-civil-amber'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 flex-wrap"> {/* flex-wrap added for responsiveness */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer ${
                            currentMode === 'programming'
                              ? 'bg-prog-primary/90 text-white hover:bg-prog-secondary/90'
                              : 'bg-civil-primary/90 text-white hover:bg-civil-secondary/90'
                          }`}
                        >
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                          Projeyi Görüntüle
                        </a>
                      )}
                      
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-all duration-200 backdrop-blur-xl cursor-pointer ${
                            currentMode === 'programming'
                              ? 'border-prog-neon text-prog-neon hover:bg-prog-neon/20 bg-black/20'
                              : 'border-civil-gold text-civil-gold hover:bg-civil-gold/20 bg-black/20'
                          }`}
                        >
                          <CodeBracketIcon className="w-5 h-5" />
                          GitHub
                        </a>
                      )}
                      
                      {project.pdfUrl && ( // Yeni eklenen PDF görüntüleme butonu
                        <a
                          href={project.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-all duration-200 backdrop-blur-xl cursor-pointer ${
                            currentMode === 'programming'
                              ? 'border-prog-primary text-prog-primary hover:bg-prog-primary/20 bg-black/20' // Renkleri programlama moduna göre ayarlandı
                              : 'border-civil-amber text-civil-amber hover:bg-civil-amber/20 bg-black/20' // Renkleri sivil moduna göre ayarlandı
                          }`}
                        >
                          <EyeIcon className="w-5 h-5" /> {/* PDF için göz ikonu */}
                          PDF Görüntüle
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}