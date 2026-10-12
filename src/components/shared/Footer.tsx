import { useModeStore } from '../../store/modeStore'

export default function Footer() {
  const { currentMode } = useModeStore()

  return (
    <footer 
    style={{
      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'
    }}
      className={`py-8 backdrop-blur-xs ${
        currentMode === 'programming' 
          ? '' 
          : 'bg-black/30'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="text-sm">
            © 2039 BizzatBen. Tüm hakları saklıdır.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <SocialLink href="https://github.com/ksyusuf" icon="🐙" label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/yusuf-akcakaya/" icon="💼" label="LinkedIn" />
            <SocialLink href="mailto:ksyusuf85@gmail.com" icon="📧" label="Email" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      className="text-2xl transition-all duration-200 hover:opacity-80 hover:animate-glow"
      aria-label={label}
    >
      {icon}
    </a>
  )
} 