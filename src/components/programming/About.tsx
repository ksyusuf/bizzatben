import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModeStore } from "../../store/modeStore";
import { devExperiences } from "./DevExperiences";
import { ExperienceItem } from "../experience/ExperienceItem";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

function SkillBadge({ name, slug }: { name: string; slug: string }) {
  return (
    <Link
      to={`/projects/tech/${slug}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm
        bg-black/30 border border-prog-accent/30 text-prog-light
        hover:border-prog-accent hover:bg-prog-accent/10 transition-all duration-200"
    >
      {name}
    </Link>
  );
}

const skillGroups = [
  {
    label: "Diller & Frameworkler",
    skills: [
      { name: "Python", slug: "Python" },
      { name: "React.js", slug: "React_js" },
      { name: "TypeScript", slug: "TypeScript" },
      { name: "Node.js", slug: "Node_js" },
      { name: "Rust", slug: "Rust" },
      { name: "Matlab", slug: "Matlab" },
    ],
  },
  {
    label: "Backend & API",
    skills: [
      { name: "FastAPI", slug: "FastAPI" },
      { name: "Express.js", slug: "Express_js" },
      { name: "Django", slug: "Django" },
      { name: "JWT", slug: "JWT" },
      { name: "OAuth2", slug: "OAuth2" },
    ],
  },
  {
    label: "Veri Tabanı",
    skills: [
      { name: "MongoDB", slug: "MongoDB" },
      { name: "PostgreSQL", slug: "PostgreSQL" },
      { name: "MongoDB Atlas", slug: "MongoDB_Atlas" },
    ],
  },
  {
    label: "Makine Öğrenmesi & Yapay Zeka",
    skills: [
      { name: "Makine Öğrenmesi", slug: "Makine_Ogrenmesi" },
      { name: "Derin Öğrenme", slug: "Derin_Ogrenme" },
      { name: "CNN", slug: "Konvolusyonel_Sinir_Aglari_CNN" },
      { name: "Doğal Dil İşleme (NLP)", slug: "Dogal_Dil_Isleme_NLP" },
      { name: "Görüntü İşleme", slug: "Goruntu_Isleme" },
      { name: "Word Embedding", slug: "Word_Embedding" },
      { name: "XGBoost", slug: "XGBoost" },
      { name: "Scikit-learn", slug: "Scikit_learn" },
      { name: "TensorFlow", slug: "TensorFlow" },
      { name: "Keras", slug: "Keras" },
    ],
  },
  {
    label: "Veri Analizi & Görselleştirme",
    skills: [
      { name: "Veri Analizi", slug: "Veri_Analizi" },
      { name: "Veri Görselleştirme", slug: "Veri_Gorsellestirme" },
      { name: "Pandas", slug: "Pandas" },
      { name: "NumPy", slug: "NumPy" },
      { name: "Matplotlib", slug: "Matplotlib" },
      { name: "Zaman Serisi Analizi", slug: "Zaman_Serisi_Analizi" },
      { name: "Regresyon", slug: "Regresyon" },
    ],
  },
  {
    label: "DevOps & Altyapı",
    skills: [
      { name: "Docker", slug: "Docker" },
      { name: "GitHub Actions", slug: "GitHub_Actions" },
      { name: "CI/CD", slug: "CI_CD" },
      { name: "Vercel", slug: "Vercel" },
      { name: "Netlify", slug: "Netlify" },
      { name: "Render.com", slug: "Render_com" },
      { name: "Semantic Versioning", slug: "Semantic_Versioning_SemVer" },
    ],
  },
  {
    label: "Frontend & Stil",
    skills: [
      { name: "Tailwind CSS", slug: "Tailwind_CSS" },
      { name: "Redux", slug: "Redux" },
      { name: "Bootstrap", slug: "Bootstrap" },
    ],
  },
  {
    label: "Web3 & Blockchain",
    skills: [
      { name: "Web3", slug: "Web3" },
      { name: "Stellar", slug: "Stellar" },
      { name: "Rust", slug: "Rust" },
    ],
  },
];

export default function DevAbout() {
  const { currentMode } = useModeStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [currentMode]);

  if (currentMode !== "programming") return null;

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="text-4xl font-bold text-prog-primary mb-4"
          >
            Yazılım Geliştirici
          </h2>
          <p
            ref={descRef}
            className="text-xl text-prog-light max-w-3xl mx-auto"
          >
            Modern web teknolojileri ile kullanıcı dostu ve performanslı
            uygulamalar geliştiriyorum.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="glass-darker rounded-xl border border-prog-accent/50 p-6 shadow-xl shadow-prog-accent/20">
            <h3 className="text-2xl font-semibold text-prog-primary mb-6">
              Yetkinlikler
            </h3>
            <div className="space-y-5">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-medium text-prog-accent/70 uppercase tracking-wider mb-2">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <SkillBadge
                        key={skill.slug}
                        name={skill.name}
                        slug={skill.slug}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            id="experience"
            className="glass-darker rounded-xl border border-prog-accent/50 p-6 shadow-xl shadow-prog-accent/20"
          >
            <h3 className="text-2xl font-semibold text-prog-primary mb-6">
              Deneyim
            </h3>
            <div className="space-y-4">
              {devExperiences.map((exp, i) => (
                <div
                  key={exp.title}
                  ref={(el) => {
                    expRefs.current[i] = el;
                  }}
                >
                  <ExperienceItem {...exp} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
