'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const scrollToSection = async (sectionId: string) => {
    setIsMenuOpen(false)

    // If we're not on the home page, navigate there first
    if (pathname !== '/') {
      await router.push('/')
      // Wait a bit for the page to load
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return
    }

    // If we're already on the home page
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
      <button onClick={() => scrollToSection('home')} className="w-12 h-12 rounded-full overflow-hidden border border-white border-opacity-30">
        <Image
          src="/disney-tomas.png"
          alt="Tomas Coox"
          width={48}
          height={48}
          className="object-cover object-center -mt-1"
        />
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <button onClick={() => scrollToSection('web')} className="hover:text-cyan-400 transition-colors">
            web
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('music')} className="hover:text-cyan-400 transition-colors">
            music
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('design')} className="hover:text-cyan-400 transition-colors">
            design
          </button>
        </li>
        <li>
          <Link href="/about" className="hover:text-cyan-400 transition-colors">about</Link>
        </li>
      </ul>

      {/* Hamburger Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5 z-50"
      >
        <motion.span 
          animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-white block"
        />
        <motion.span 
          animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-0.5 bg-white block"
        />
        <motion.span 
          animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-white block"
        />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black pt-24"
          >
            <ul className="flex flex-col items-center text-3xl space-y-8">
              <li>
                <button 
                  onClick={() => scrollToSection('web')} 
                  className="hover:text-cyan-400 transition-colors"
                >
                  web
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('music')} 
                  className="hover:text-cyan-400 transition-colors"
                >
                  music
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('design')} 
                  className="hover:text-cyan-400 transition-colors"
                >
                  design
                </button>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  about
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
