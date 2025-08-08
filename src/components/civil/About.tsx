import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeStore } from '../../store/modeStore'
gsap.registerPlugin(ScrollTrigger)

export default function CivilAbout() {
  const { currentMode } = useModeStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])
  const expRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
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
    if (skillRefs.current.length > 0) {
      gsap.fromTo(
        skillRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    if (expRefs.current.length > 0) {
      gsap.fromTo(
        expRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [currentMode])

  if (currentMode !== 'civil') return null

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl font-bold text-civil-primary mb-4">
            İnşaat Mühendisi
          </h2>
          <p ref={descRef} className="text-xl text-civil-light max-w-3xl mx-auto">
            Sürdürülebilir ve güvenli yapılar tasarlayarak topluma değer katıyorum.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-darker rounded-xl border border-civil-primary/50 p-6 shadow-xl shadow-civil-primary/20">
            <h3 className="text-2xl font-semibold text-civil-primary mb-6">
              Yetkinlikler
            </h3>
            <div className="space-y-4">
              {['MS Excel (Uzman)', 'MS Word (Uzman)', 'Autocad (İleri)', 'MS Office (İleri)', 'İş Takibi', 'Raporlama', 'Organizasyon', 'İhale Hazırlığı'].map((name, i) => (
                  <div key={name} ref={el => { skillRefs.current[i] = el; }}>
                      <SkillItem name={name} level={name.includes('(Uzman)') ? 95 : name.includes('(İleri)') ? 85 : 75} />
                  </div>
              ))}
            </div>      
          </div>
          <div id="experience" className="glass-darker rounded-xl border border-civil-primary/50 p-6 shadow-xl shadow-civil-primary/20">
            <h3 className="text-2xl font-semibold text-civil-primary mb-6">
              Deneyim
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: 'İnşaat Mühendisliği (Dönemlik)',
                  company: 'Esedoğlu İnşaat',
                  period: '07/24 – 01/25',
                  description: 'Taşeron bünyesinde ataşmanlı hak ediş hazırlanıp üst firmaya sunulması. Ekip hak edişlerinin hazırlanması. Saha, ekip ve puantaj takibi. Birim fiyat teklif formu hazırlama işleri. Şap, duvar, sıva, seramik ve boya ağırlıklı iş yönetimi.'
                },
                {
                  title: 'İhale Subaylığı (Askerlik Görevi)',
                  company: 'TSK İhale Komisyon Başkanlığı',
                  period: '04/23 – 04/24',
                  description: 'Türk Silahlı Kuvvetleri 108. Topçu Alay Komutanlığı İhale Komisyon Başkanlığı biriminde alayın tüm ihalelerinin yapılması. Teklif formlarının alınması, yaklaşık maliyet kontrolü, ihale kazananı belirlenmesi, sözleşmelerin yapılması ve ihale dosyasının hazırlanması işlerinin yapılması.'
                },
                {
                  title: 'Proje Mühendisliği (Tekirdağ)',
                  company: 'Biberoğlu Mimarlık',
                  period: '08/21 – 12/22',
                  description: 'Yapım, yıkım ve isim değişikliği ruhsatı alma işlemlerinde baştan sona iş takibi. İmar durumu kontrolü, belediye başvuruları, harç kontrolü, yapı denetim, iş bitirme, iskân alınması. Mimari, inşaat, mekanik, elektrik, zemin etüdü projelerinin başvurulması ve organizasyonunun sağlanması. Gerektiği durumlarda şantiye proje uygunluk kontrolü.'
                }
              ].map((exp, i) => (
                <div key={exp.title} ref={el => { expRefs.current[i] = el; }}>
                  <ExperienceItem {...exp} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillItem({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-civil-light">{name}</span>
        <span className="text-sm text-civil-accent">{level}%</span>
      </div>
      <div className="w-full bg-black/50 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-civil-primary to-civil-accent h-2 rounded-full shadow-lg shadow-civil-primary/50"
        />
      </div>
    </div>
  )
}

function ExperienceItem({ 
  title, 
  company, 
  period, 
  description 
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: string 
}) {
  return (
    <div className="relative border-l-4 border-civil-primary pl-6 pb-8 last:pb-0">
      <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-civil-primary"></div>
      <h4 className="font-semibold text-xl text-civil-light dark:text-gray-100">{title}</h4>
      <p className="font-medium text-civil-accent mt-1 dark:text-civil-accent-light">{company}</p>
      <p className="text-sm text-civil-light/60 mb-3 mt-1">{period}</p>
      <p className="text-civil-light/80 leading-relaxed dark:text-gray-300">{description}</p>
    </div>
  );
}
