'use client'

import React, { useEffect } from 'react'
import { TextParallaxContent } from '@/components/TextParallaxContent'
import Hero from '@/components/Hero'
import Background3D from '@/components/Background3D'

const SECTIONS = ['home', 'web', 'music', 'design']

export default function Home() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault() // Prevent default scroll behavior

        // Find the current section
        const currentSection = SECTIONS.find(section => {
          const element = document.getElementById(section)
          if (!element) return false
          const rect = element.getBoundingClientRect()
          return rect.top >= -100 && rect.top <= 100
        })

        if (!currentSection) return

        // Get current index and calculate next index
        const currentIndex = SECTIONS.indexOf(currentSection)
        const nextIndex = e.key === 'ArrowDown' 
          ? Math.min(currentIndex + 1, SECTIONS.length - 1)
          : Math.max(currentIndex - 1, 0)

        // Scroll to next/previous section
        const nextSection = document.getElementById(SECTIONS[nextIndex])
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="relative">
      <div className="fixed inset-0 z-0">
        <Background3D />
      </div>

      <div className="relative z-10">
        <section id="home" className="min-h-screen flex items-center pt-16">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <Hero />
          </div>
        </section>

        <div className="mt-8">
          <section id="web" className="mb-8">
            <TextParallaxContent
              imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
              subheading="Web Development"
              heading="Modern Solutions"
              title="Crafting Digital Experiences"
              description="From responsive designs to interactive applications, I bring ideas to life through clean, efficient code. Specializing in modern web technologies and frameworks to create seamless user experiences."
            />
          </section>

          <section id="music" className="mb-8">
            <TextParallaxContent
              imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop"
              subheading="Music Production"
              heading="Sonic Landscapes"
              title="Creating Immersive Soundscapes"
              description="Blending technical precision with creative expression to produce unique and engaging musical experiences. From composition to production, every project is crafted with attention to detail."
            />
          </section>

          <section id="design" className="mb-8">
            <TextParallaxContent
              imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop"
              subheading="Digital Design"
              heading="Visual Stories"
              title="Transforming Ideas into Art"
              description="Combining artistic vision with technical expertise to create memorable and impactful digital designs. Each project is an opportunity to push creative boundaries and deliver stunning visuals."
            />
          </section>
        </div>
      </div>
    </main>
  )
}
