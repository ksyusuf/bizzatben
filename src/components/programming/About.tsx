import { motion } from 'framer-motion'
import { useModeStore } from '../../store/modeStore'

export default function About() {
  const { currentMode } = useModeStore()

  if (currentMode !== 'programming') return null

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
          <h2 className="text-4xl font-bold text-prog-primary mb-4">
            Yazılım Geliştirici
          </h2>
          <p className="text-xl text-prog-light max-w-3xl mx-auto">
            Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-darker rounded-xl border border-prog-accent/50 p-6 shadow-xl shadow-prog-accent/20"
          >
            <h3 className="text-2xl font-semibold text-prog-primary mb-6">
              Teknolojiler
            </h3>
            <div className="space-y-4">
              <SkillItem name="React" level={90} />
              <SkillItem name="TypeScript" level={85} />
              <SkillItem name="Node.js" level={80} />
              <SkillItem name="Python" level={75} />
              <SkillItem name="Docker" level={70} />
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-darker rounded-xl border border-prog-accent/50 p-6 shadow-xl shadow-prog-accent/20"
          >
            <h3 className="text-2xl font-semibold text-prog-primary mb-6">
              Deneyim
            </h3>
            <div className="space-y-4">
              <ExperienceItem 
                title="Senior Frontend Developer"
                company="TechCorp"
                period="2022 - Günümüz"
                description="React ve TypeScript ile büyük ölçekli web uygulamaları geliştiriyorum."
              />
              <ExperienceItem 
                title="Full Stack Developer"
                company="StartupXYZ"
                period="2020 - 2022"
                description="Node.js ve React ile end-to-end çözümler geliştirdim."
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
        <span className="font-medium text-prog-light">{name}</span>
        <span className="text-sm text-prog-accent">{level}%</span>
      </div>
      <div className="w-full bg-black/50 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gradient-to-r from-prog-primary to-prog-accent h-2 rounded-full shadow-lg shadow-prog-primary/50"
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
    <div className="border-l-4 border-prog-primary pl-4">
      <h4 className="font-semibold text-prog-light">{title}</h4>
      <p className="text-prog-accent font-medium">{company}</p>
      <p className="text-sm text-prog-light/60 mb-2">{period}</p>
      <p className="text-prog-light/80">{description}</p>
    </div>
  )
} 