// src/components/shared/Navbar.tsx
import { useRef, useEffect } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import ToggleButton from './ToggleButton'
import { Link, useLocation } from 'react-router-dom'

gsap.registerPlugin(useGSAP, ScrollToPlugin)

// Navigation links yapısını tanımlama
interface NavLinkItem {
  href: string;
  label: string;
  showInProgrammingMode?: boolean;
}

const NAVIGATION_LINKS: NavLinkItem[] = [
  { href: "#about", label: "Hakkımda", showInProgrammingMode: true },
  { href: "#experience", label: "Deneyim", showInProgrammingMode: false },
  { href: "/Alll-projects", label: "Projeler", showInProgrammingMode: true },
  { href: "/certificates", label: "Sertifikalar", showInProgrammingMode: true },
  { href: "#contact", label: "İletişim", showInProgrammingMode: true },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { currentMode } = useModeStore()

  // İlk yüklemede navbar ve logo animasyonu
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )

    gsap.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
  }, { scope: navRef })

  // Mod geçişlerinde navbar link animasyonu
  useGSAP(() => {
    const links = navRef.current?.querySelectorAll('[data-nav-link]')
    if (!links || links.length === 0) return

    const fromX =
      currentMode === 'programming'
        ? -40 // dev moduna geçerken soldan sağa
        : 40  // civil moduna geçerken sağdan sola (veya diğer modlar)

    gsap.fromTo(
      links,
      { x: fromX, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
      }
    )
  }, { scope: navRef, dependencies: [currentMode] })

  // Sayfa yüklendiğinde veya location.hash değiştiğinde kaydırma işlemini kontrol eden hook
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        gsap.to(window, {
          scrollTo: {
            y: element,
            offsetY: 100 // Navbar'ın yüksekliği kadar bir offset
          },
          duration: 1,
          ease: "power2.inOut"
        })
      }
    }
  }, [location])

  const isHomePage = location.pathname === '/';
  
  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/20 shadow-lg">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div ref={logoRef} className="flex-shrink-0">
            <Link 
              to="/" 
              onClick={() => {
                // sayfayı yenilemeden ana sayfa ve yukarı git
                window.scrollTo(0, 0);
              }}
              className="text-2xl font-bold transition-all duration-200"
            >
              Yusuf
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {NAVIGATION_LINKS.map((link) => (
              <div
                key={link.href}
                data-nav-link
                className="transition-all duration-300 ease-out transform"
              >
                <NavLink href={link.href} isHomePage={isHomePage}>
                  {link.label}
                </NavLink>
              </div>
            ))}
          </div>

          <ToggleButton />

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 rounded-lg cursor-pointer">
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
                <Menu.Items
                  className="absolute right-0 mt-2 w-35 origin-top-right rounded-lg shadow-lg border
                            bg-black/90 text-center"
                >
                  <div className="py-1 relative">
                    {NAVIGATION_LINKS.map((link) => (
                      <div
                        key={link.href}
                        data-nav-link
                        className="transition-all duration-300 ease-out relative"
                      >
                        <MobileNavLink href={link.href} isHomePage={isHomePage}>
                          {link.label}
                        </MobileNavLink>
                      </div>
                    ))}
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

function NavLink({ href, children, isHomePage }: { href: string; children: React.ReactNode; isHomePage: boolean; }) {
  // Eğer href zaten / ile başlıyorsa, doğrudan kullan
  // Eğer href # ile başlıyorsa (anchor link), isHomePage true ise kullan, false ise / ile birleştir
  const linkPath = href.startsWith('/') 
    ? href 
    : isHomePage 
      ? href 
      : `/${href}`;

  return (
    <Link
      to={linkPath}
      className="font-medium transition-colors duration-200 hover:opacity-80 hover:scale-105"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, isHomePage }: { href: string; children: React.ReactNode; isHomePage: boolean; }) {
  // Eğer href zaten / ile başlıyorsa, doğrudan kullan
  // Eğer href # ile başlıyorsa (anchor link), isHomePage true ise kullan, false ise / ile birleştir
  const linkPath = href.startsWith('/') 
    ? href 
    : isHomePage 
      ? href 
      : `/${href}`;
  
  return (
    <Menu.Item>
      <Link
          to={linkPath}
          className="block px-4 py-2 text-sm transition-colors duration-200"
        >
          {children}
        </Link>
    </Menu.Item>
  );
}