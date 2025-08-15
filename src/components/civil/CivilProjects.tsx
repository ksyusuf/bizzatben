// src/components/civil/CivilProjects.tsx
import { type Project } from '../project/ProjectCard'

export const civilImages = import.meta.glob<{ default: string }>(
  './img/*.{png,jpg,jpeg,svg,gif}',
  { eager: true }
);
  
export const civilProjects: Project[] = [
  {
    id: '1',
    title: 'Centre Pompidou Araştırması',
    description: 'Nisan 2019\'da İnşaat Mühendisliği lisansım sırasında Mühendisliğe Giriş dersi için hazırladığım kapsamlı bir araştırma projesidir. Bu çalışmada, ikonik Pompidou Merkezi binasının teknik yapısı derinlemesine incelenmiştir. Yapının mimari ve mühendislik özellikleri detaylandırılarak, merkezin teknik detaylarına dair merakları gidermeyi hedeflemektedir.',
    image: civilImages['./img/pompidou.jpg'].default,
    technologies: [
      { name: 'Mimari Analiz', slug: 'Mimari_Analiz' },
      { name: 'Yapı Mühendisliği', slug: 'Yapi_Muhendisligi' },
      { name: 'Mühendisliğe Giriş', slug: 'Muhendislige_Giris' }],
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
    image: civilImages['./img/betonarme-projem.png'].default,
    technologies: [
      { name: 'Betonarme Tasarım İlkeleri', slug: 'Betonarme_Tasarim_Ilkeleri' },
      { name: 'Yapı Statiği', slug: 'Yapi_Statigi' },
      { name: 'TS 500', slug: 'TS_500' }],
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
    image: '',
    technologies: [
      { name: 'R Programlama Dili', slug: 'R_Programlama_Dili' },
      { name: 'Keşifsel Veri Analizi', slug: 'Kesifsel_Veri_Analizi' },
      { name: 'İstatistiksel Analiz', slug: 'Istatistiksel_Analiz' },
      { name: 'Rüzgar Enerjisi', slug: 'Ruzgar_Enerjisi' }],
    github: 'https://github.com/ksyusuf/KVA-Projem',
    prod: '',
    medium: '',
    pdfUrl: '',
    date: '2021-07-03',
  },
]
  
export const civilTechMap = civilProjects.reduce((acc, project) => {
  project.technologies.forEach(tech => {
    if (!acc[tech.slug]) {
      acc[tech.slug] = [];
    }
    acc[tech.slug].push(project.id);
  });
  return acc;
}, {} as Record<string, string[]>);

