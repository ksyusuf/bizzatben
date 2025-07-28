import { useModeStore } from '../../store/modeStore'

export default function Footer() {
  const { currentMode } = useModeStore()

  return (
    <footer 
      className={`py-8 backdrop-blur-2xl border-t ${
        currentMode === 'programming' 
          ? 'bg-black/40 border-prog-neon/50 shadow-lg shadow-prog-neon/20' 
          : 'bg-black/40 border-civil-gold/50 shadow-lg shadow-civil-gold/20'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div 
            className={`text-sm ${
              currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
            }`}
          >
            © 2024 BizzatBen. Tüm hakları saklıdır.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <SocialLink href="https://github.com" icon="🐙" label="GitHub" />
            <SocialLink href="https://linkedin.com" icon="💼" label="LinkedIn" />
            <SocialLink href="https://twitter.com" icon="🐦" label="Twitter" />
            <SocialLink href="mailto:contact@bizzatben.com" icon="📧" label="Email" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  const { currentMode } = useModeStore()
  
  return (
    <a
      href={href}
      className={`text-2xl transition-all duration-200 hover:opacity-80 ${
        currentMode === 'programming' 
          ? 'text-prog-light hover:text-prog-neon hover:animate-glow' 
          : 'text-civil-light hover:text-civil-gold hover:animate-glow'
      }`}
      aria-label={label}
    >
      {icon}
    </a>
  )
} 