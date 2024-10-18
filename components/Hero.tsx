'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="flex justify-between items-center p-6">
                <div className="text-2xl font-bold">fm</div>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/projects">Projects</Link>
                    </li>
                    <li>
                        <Link href="/experience">Experience</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>

            {/* Main content */}
            <div className="flex flex-col items-center justify-center text-center mt-20">
                {/* Circular image */}
                <div className="w-40 h-40 rounded-full overflow-hidden  p-1 mb-8">
                    <div className="w-full h-full rounded-full overflow-hidden border border-white border-opacity-30">
                        <Image
                            src="/disney-tomas.png"
                            alt="Tomas Coox"
                            width={160}
                            height={160}
                            objectFit="cover"
                            className="object-center -mt-3"
                        />
                    </div>
                </div>

                {/* Main text */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <div>Tomas Coox</div>
                    <div className='text-2xl mt-2'>Media-designer based in Sundsvall, Sweden</div>
                </h1>

                {/* Subtext */}
                <p className="max-w-2xl mx-auto text-gray-400 mb-8">
                    I am a versatile creative professional with a passion for
                    web development, music, and animation. As a web developer,
                    I craft engaging digital experiences. My musical background
                    as a musician infuses my work with rhythm and harmony,
                    while my animation skills bring static designs to life.
                    This unique blend of talents allows me to create immersive
                    and dynamic projects across various digital mediums.
                </p>
            </div>
        </div>
    )
}

export default Hero
