'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 mr-5">
      <button onClick={() => scrollToSection('home')} className="w-12 h-12 rounded-full overflow-hidden border border-white border-opacity-30">
        <Image
          src="/disney-tomas.png"
          alt="Tomas Coox"
          width={48}
          height={48}
          className="object-cover object-center -mt-1"
        />
      </button>
      <ul className="flex space-x-6">
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
    </nav>
  )
}

export default Navbar
