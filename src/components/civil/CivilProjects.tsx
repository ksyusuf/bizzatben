// src/components/civil/CivilProjects.tsx
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

// assetsLoader.js
export const civilImages = import.meta.glob<{ default: string }>(
  './img/*.{png,jpg,jpeg,svg,gif}',
  { eager: true }
);
  
export const civilProjects: Project[] = [
  {
    id: '1',
    title: 'Centre Pompidou Araştırması',
    description: 'Nisan 2019\'da İnşaat Mühendisliği lisansım sırasında Mühendisliğe Giriş dersi için hazırladığım kapsamlı bir araştırma projesidir. Bu çalışmada, ikonik Pompidou Merkezi binasının teknik yapısı derinlemesine incelenmiştir. Yapının mimari ve mühendislik özellikleri detaylandırılarak, merkezin teknik detaylarına dair merakları gidermeyi hedeflemektedir.',
    image: './civil/img/pompidou.jpg',
    technologies: ['Mimari Analiz', 'Yapı Mühendisliği', 'Mühendisliğe Giriş'],
    link: 'https://yusufakcakaya.blogspot.com/2019/04/centre-pompidou.html',
    github: '',
    prod: '',
    medium: '',
    pdfUrl: '',
    date: '2019-04-20',
  },
  {
    id: '2',
    title: 'Betonarme Bitirme Projesi',
    description: '2020-2021 Güz Döneminde tamamlanan betonarme bitirme projesi. Proje, betonarme tasarımı ve uygulama detaylarına odaklanmaktadır. Projenin kaynakları incelenerek fark edilen bazı hatalar ve düzeltme gereksinimleri de açıklanmıştır.',
    image: '/src/components/civil/img/betonarme-projem.png',
    technologies: ['Betonarme Tasarım İlkeleri', 'Yapı Statiği', 'TS 500'],
    link: 'https://yusufakcakaya.blogspot.com/2021/02/betonarme-projem.html',
    github: '',
    prod: '',
    medium: '',
    pdfUrl: '',
    date: '2021-02-26',
  },
  {
    id: '3',
    title: 'Veri Analizi Projem (Kıbrıs Rüzgar & Buharlaşma Analizi)',
    description: '2020-2021 Bahar Döneminde Kıbrıs Ercan Havalimanı ve Orta Mesarya bölgesinden elde edilen rüzgâr hızları ve buharlaşma miktarları kullanılarak gerçekleştirilmiş bitirme projesi. Bu analizde, bölgenin rüzgâr hızları ve buharlaşma miktarlarının dağılımları ile birbirleriyle olan ilişkileri incelenerek, rüzgar türbini yapılması konusunda çıkarımlarda bulunulmuştur. Keşifsel veri analizi R programlama dili kullanılarak yaklaşık 14 haftada tamamlanmıştır. Proje, bilimsel makale formatı konusunda önemli deneyimler kazandırmıştır.',
    technologies: ['R Programlama Dili', 'Keşifsel Veri Analizi', 'İstatistiksel Analiz', 'Rüzgar Enerjisi'],
    github: 'https://github.com/ksyusuf/KVA-Projem',
    prod: '',
    medium: '',
    pdfUrl: '',
    date: '2021-07-03',
  },
]
  
export const civilTechMap = civilProjects.reduce((acc, project) => {
  project.technologies.forEach(tech => {
    if (!acc[tech]) {
      acc[tech] = []
    }
    acc[tech].push(project.id)
  })
  return acc
}, {} as Record<string, string[]>)
