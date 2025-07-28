import { motion } from 'framer-motion'
import { useModeStore } from '../../store/modeStore'

export default function About() {
  const { currentMode } = useModeStore()

  if (currentMode !== 'civil') return null

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="section-padding bg-black/20"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-civil-primary mb-4">
            İnşaat Mühendisi
          </h2>
          <p className="text-xl text-civil-light max-w-3xl mx-auto">
            Sürdürülebilir ve güvenli yapılar tasarlayarak topluma değer katıyorum.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-darker rounded-xl border border-civil-primary/50 p-6 shadow-xl shadow-civil-primary/20"
          >
            <h3 className="text-2xl font-semibold text-civil-primary mb-6">
              Uzmanlık Alanları
            </h3>
            <div className="space-y-4">
              <SkillItem name="Yapı Analizi" level={95} />
              <SkillItem name="Beton Teknolojisi" level={90} />
              <SkillItem name="Çelik Yapılar" level={85} />
              <SkillItem name="Deprem Mühendisliği" level={80} />
              <SkillItem name="Proje Yönetimi" level={75} />
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-darker rounded-xl border border-civil-primary/50 p-6 shadow-xl shadow-civil-primary/20"
          >
            <h3 className="text-2xl font-semibold text-civil-primary mb-6">
              Deneyim
            </h3>
            <div className="space-y-4">
              <ExperienceItem 
                title="Kıdemli İnşaat Mühendisi"
                company="MegaYapı Ltd."
                period="2021 - Günümüz"
                description="Büyük ölçekli konut ve ticari projelerde yapısal tasarım ve analiz yapıyorum."
              />
              <ExperienceItem 
                title="Proje Mühendisi"
                company="İnşaatPro"
                period="2019 - 2021"
                description="Çok katlı binalar ve köprü projelerinde görev aldım."
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
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
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
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
    <div className="border-l-4 border-civil-primary pl-4">
      <h4 className="font-semibold text-civil-light">{title}</h4>
      <p className="text-civil-accent font-medium">{company}</p>
      <p className="text-sm text-civil-light/60 mb-2">{period}</p>
      <p className="text-civil-light/80">{description}</p>
    </div>
  )
} 