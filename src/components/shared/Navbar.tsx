import { useRef } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ToggleButton from './ToggleButton'

export default function Navbar() {
  const { currentMode } = useModeStore()
  
  // GSAP refs
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Initial navbar animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    
    // Logo animation
    gsap.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    )
  }, { scope: navRef })

  // Toggle button is now handled by ToggleButton component

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl ${
        currentMode === 'programming'
          ? 'bg-black/20 shadow-lg shadow-prog-accent/20'
          : 'bg-black/20 shadow-lg shadow-civil-primary/20'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#about">Hakkımda</NavLink>
            <NavLink href="#projects">Projeler</NavLink>
            <NavLink href="#experience">Deneyim</NavLink>
            <NavLink href="#contact">İletişim</NavLink>
          </div>

          {/* Mode Toggle */}
          <ToggleButton />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Menu as="div" className="relative">
              <Menu.Button className={`p-2 rounded-lg cursor-pointer ${
                currentMode === 'programming'
                  ? 'text-prog-primary hover:bg-prog-primary/20'
                  : 'text-civil-primary hover:bg-civil-primary/20'
              }`}>
                <Bars3Icon className="h-6 w-6" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className={`absolute right-0 mt-2 w-48 origin-top-right rounded-lg shadow-lg backdrop-blur-2xl ${
                  currentMode === 'programming'
                    ? 'bg-black/80 border border-prog-accent/50 shadow-lg shadow-prog-accent/20'
                    : 'bg-black/80 border border-civil-primary/50 shadow-lg shadow-civil-primary/20'
                }`}>
                  <div className="py-1">
                    <MobileNavLink href="#about">Hakkımda</MobileNavLink>
                    <MobileNavLink href="#projects">Projeler</MobileNavLink>
                    <MobileNavLink href="#experience">Deneyim</MobileNavLink>
                    <MobileNavLink href="#contact">İletişim</MobileNavLink>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { currentMode } = useModeStore()

  return (
    <a
      href={href}
      className={`font-medium transition-colors duration-200 hover:opacity-80 hover:scale-105 ${
        currentMode === 'programming'
          ? 'text-prog-light hover:text-prog-primary'
          : 'text-civil-light hover:text-civil-primary'
      }`}
    >
      {children}
    </a>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { currentMode } = useModeStore()

  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={href}
          className={`block px-4 py-2 text-sm transition-colors duration-200 ${
            active
              ? (currentMode === 'programming' ? 'bg-prog-primary/20 text-prog-primary' : 'bg-civil-primary/20 text-civil-primary')
              : (currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light')
          }`}
        >
          {/* toggle icons
          https://uiverse.io/reglobby/stupid-penguin-97
          https://uiverse.io/3HugaDa3/evil-snake-3
          https://uiverse.io/petar_4019/fuzzy-quail-99
          https://uiverse.io/andrew-demchenk0/light-dragonfly-53 
          */}
          {children}
        </a>
      )}
    </Menu.Item>
  )
}
