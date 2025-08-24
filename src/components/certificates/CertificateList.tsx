 // src/components/certificates/certificates.tsx
import { type Certificate } from './CertificateCard'

export const certificateImages = import.meta.glob<{ default: string }>(
  './certificate_docs/*.{png,jpg,jpeg,pdf}',
  { eager: true }
);

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'İstanbul Yarı Maraton Sertifikası',
    issuer: 'Spor İstanbul',
    issueDate: '2025-05-02',
    expiryDate: null,
    credentialId: '2F779997-D8CE-4341-B948-0444B6936925',
    credentialUrl: '',
    description: 'İstanbul Yarı Maraton\'u başarıyla tamamladığım için verilen katılım sertifikası.',
    tags: [
      { name: 'Spor', slug: 'spor' },
      { name: 'Maraton', slug: 'maraton' },
      { name: 'Dayanıklılık', slug: 'dayaniklilik' },
      { name: 'Fitness', slug: 'fitness' }
    ],
    image: certificateImages['./certificate_docs/istanbul_yari_maraton.jpg'].default,
  },
  {
    id: '2',
    title: 'YTÜ Kitap Bağış Teşekkür Sertifikası',
    issuer: 'Yıldız Teknik Üniversitesi',
    issueDate: '2024-07-08',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'Yıldız Teknik Üniversitesi kütüphanesine yapılan kitap bağışı için teşekkür sertifikası.',
    tags: [
      { name: 'Eğitim', slug: 'egitim' },
      { name: 'Bağış', slug: 'bagis' },
      { name: 'Kütüphane', slug: 'kutuphane' },
      { name: 'YTÜ', slug: 'ytu' }
    ],
    image: certificateImages['./certificate_docs/YTU_Kitap_Bagis_Tesekkurler.png'].default,
  },
  {
    id: '3',
    title: 'Generative AI',
    issuer: 'Akbank',
    issueDate: '2025-01-30',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'Akbank tarafından düzenlenen Generative AI eğitimi kapsamında alınan sertifika.',
    tags: [
      { name: 'Yapay Zeka', slug: 'yapay-zeka' },
      { name: 'Generative AI', slug: 'generative-ai' },
      { name: 'Akbank', slug: 'akbank' },
      { name: 'Eğitim', slug: 'egitim' }
    ],
    image: certificateImages['./certificate_docs/Generative_Ai-Akbank_2025-02-05_09_21_03.png'].default,
  },
  {
    id: '4',
    title: 'AWS Training',
    issuer: 'Limon Cloud',
    issueDate: '2024-05-06',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'Limon Cloud tarafından verilen AWS (Amazon Web Services) eğitimi sertifikası.',
    tags: [
      { name: 'AWS', slug: 'aws' },
      { name: 'Cloud Computing', slug: 'cloud-computing' },
      { name: 'Limon Cloud', slug: 'limon-cloud' },
      { name: 'Eğitim', slug: 'egitim' }
    ],
    image: certificateImages['./certificate_docs/AWS_Training-Limon_Cloud.png'].default,
  },
  {
    id: '5',
    title: 'İlk Yardım Eğitimi',
    issuer: 'Milli Eğitim Bakanlığı (MEB)',
    issueDate: '2023-12-19',
    expiryDate: null,
    credentialId: '20787820230085018640',
    credentialUrl: '',
    description: 'Milli Eğitim Bakanlığı tarafından verilen ilk yardım eğitimi sertifikası.',
    tags: [
      { name: 'İlk Yardım', slug: 'ilk-yardim' },
      { name: 'MEB', slug: 'meb' },
      { name: 'Sağlık', slug: 'saglik' },
      { name: 'Eğitim', slug: 'egitim' }
    ],
    image: certificateImages['./certificate_docs/ilk_Yardim_Egitimi-MEB.png'].default,
  },
  {
    id: '6',
    title: 'Akbank Makine Öğrenmesi Bootcamp',
    issuer: 'Global AI Hub',
    issueDate: '2023-11-06',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'Global AI Hub ve Akbank işbirliğiyle düzenlenen Makine Öğrenmesi Bootcamp sertifikası.',
    tags: [
      { name: 'Makine Öğrenmesi', slug: 'makine-ogrenmesi' },
      { name: 'Global AI Hub', slug: 'global-ai-hub' },
      { name: 'Akbank', slug: 'akbank' },
      { name: 'Bootcamp', slug: 'bootcamp' }
    ],
    image: certificateImages['./certificate_docs/Akbank_Makine_ogrenmesi_Bootcamp-Global_Ai_Hub.png'].default,
  },
  {
    id: '7',
    title: 'Miuul Machine Learning',
    issuer: 'Miuul',
    issueDate: '2023-11-05',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'Miuul tarafından verilen Makine Öğrenmesi eğitimi sertifikası.',
    tags: [
      { name: 'Makine Öğrenmesi', slug: 'makine-ogrenmesi' },
      { name: 'Miuul', slug: 'miuul' },
      { name: 'Eğitim', slug: 'egitim' },
      { name: 'Veri Bilimi', slug: 'veri-bilimi' }
    ],
    image: certificateImages['./certificate_docs/Miuul_Machine_Learning-2023-11-05.png'].default,
  },
  {
    id: '8',
    title: 'Introduction to Machine Learning',
    issuer: 'Global AI Hub',
    issueDate: '2023-10-07',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'Global AI Hub tarafından verilen Makine Öğrenmesine Giriş eğitimi sertifikası.',
    tags: [
      { name: 'Makine Öğrenmesi', slug: 'makine-ogrenmesi' },
      { name: 'Global AI Hub', slug: 'global-ai-hub' },
      { name: 'Eğitim', slug: 'egitim' },
      { name: 'Giriş Seviyesi', slug: 'giris-seviyesi' }
    ],
    image: certificateImages['./certificate_docs/introduction_to_Machine_Learning-Global_Ai_Hub.png'].default,
  },
  {
    id: '9',
    title: 'Yapay Zekaya İlk Adım',
    issuer: 'Global AI Hub',
    issueDate: '2023-10-01',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'Global AI Hub tarafından verilen Yapay Zekaya İlk Adım eğitimi sertifikası.',
    tags: [
      { name: 'Yapay Zeka', slug: 'yapay-zeka' },
      { name: 'Global AI Hub', slug: 'global-ai-hub' },
      { name: 'Eğitim', slug: 'egitim' },
      { name: 'Giriş Seviyesi', slug: 'giris-seviyesi' }
    ],
    image: certificateImages['./certificate_docs/Yapay_Zekaya_ilk_Adim-Global_Ai_Hub.png'].default,
  },
  {
    id: '10',
    title: 'Location Of Strawberry Fruit RealTime Processing',
    issuer: 'ISARC',
    issueDate: '2022-10-08',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: '4. INTERNATIONAL GOBEKLITEPE SCIENTIFIC RESEARCH CONGRESS konferansında sunulan çilek algılama projesi için verilen sertifika.',
    tags: [
      { name: 'Konferans', slug: 'konferans' },
      { name: 'Bilimsel Araştırma', slug: 'bilimsel-arastirma' },
      { name: 'Görüntü İşleme', slug: 'goruntu-isleme' },
      { name: 'Çilek Algılama', slug: 'cilek-algilama' }
    ],
    image: certificateImages['./certificate_docs/Location_Of_Strawberry_Fruit_RealTime_Processing.png'].default,
  },
  {
    id: '11',
    title: 'Separation of Okra Image Processing',
    issuer: 'Association of Science and Technology',
    issueDate: '2022-07-28',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'II. INTERNATIONAL CONFERENCE ON GLOBAL PRACTICE OF MULTIDISCIPLINARY SCIENTIFIC STUDIES konferansında sunulan bamya algılama projesi için verilen sertifika.',
    tags: [
      { name: 'Konferans', slug: 'konferans' },
      { name: 'Bilimsel Araştırma', slug: 'bilimsel-arastirma' },
      { name: 'Görüntü İşleme', slug: 'goruntu-isleme' },
      { name: 'Bamya Algılama', slug: 'bamya-algilama' }
    ],
    image: certificateImages['./certificate_docs/Separation_of_Okra_image_Processing.png'].default,
  },
  {
    id: '12',
    title: 'Python Programlamaya Giriş',
    issuer: 'İSMEK',
    issueDate: '2021-03-18',
    expiryDate: null,
    credentialId: '',
    credentialUrl: '',
    description: 'İSMEK tarafından verilen Python Programlamaya Giriş eğitimi sertifikası.',
    tags: [
      { name: 'Python', slug: 'python' },
      { name: 'İSMEK', slug: 'ismek' },
      { name: 'Programlama', slug: 'programlama' },
      { name: 'Eğitim', slug: 'egitim' }
    ],
    image: certificateImages['./certificate_docs/Python_Programlamaya_Giris_Sertifikasi-iSMEK.png'].default,
  }
]

export const certificateTagMap = certificates.reduce((acc, certificate) => {
  certificate.tags.forEach((tag) => {
    if (!acc[tag.slug]) {
      acc[tag.slug] = [];
    }
    acc[tag.slug].push(certificate.id);
  });
  return acc;
}, {} as Record<string, string[]>);