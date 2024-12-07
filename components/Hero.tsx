'use client'

import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Main content */}
            <div className="flex flex-col items-center justify-center text-center mt-20">
                {/* Circular image */}
                <div className="w-64 h-64 rounded-full overflow-hidden p-1 mb-10">
                    <div className="w-full h-full rounded-full overflow-hidden border border-white border-opacity-30">
                        <Image
                            src="/disney-tomas.png"
                            alt="Tomas Coox"
                            width={280}
                            height={280}
                            objectFit="cover"
                            className="object-center -mt-5"
                        />
                    </div>
                </div>

                {/* Main text */}
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    <div>Tomas Coox</div>
                    <div className="text-3xl mt-4">
                        Digital media-designer based in Sundsvall,
                        Sweden
                    </div>
                </h1>

                {/* Subtext */}
                <div className="max-w-3xl mx-auto text-gray-300">
                    <p>
                        I am a versatile creative professional with a
                        passion for web development, music, graphic design
                        and animation/video editing.
                    </p>
                    <p>
                        As a web developer, I craft engaging digital
                        experiences. My musical background as a musician
                        infuses my work with rhythm and harmony, while my
                        animation skills bring static designs to life.
                    </p>
                    <p>
                        This unique blend of talents allows me to create
                        immersive and dynamic projects across various
                        digital mediums.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hero
