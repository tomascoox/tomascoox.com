'use client'

import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className="min-h-screen bg-black text-white px-8 md:px-12 lg:px-16">
            {/* Main content */}
            <div className="flex flex-col items-center justify-center text-center mt-20">
                {/* Circular image */}
                <div className="w-64 h-64 rounded-full overflow-hidden p-1 mb-10">
                    <div className="w-full h-full rounded-full overflow-hidden border border-white border-opacity-30">
                        <Image
                            src="https://res.cloudinary.com/dlgygfs0a/image/upload/f_auto,q_auto,w_560,c_fill,g_center,ar_1:1/v1733583224/tomas-cool-solglasogon_tauhyi.png"
                            alt="Tomas Coox Portrait"
                            width={280}
                            height={280}
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 256px, 280px"
                        />
                    </div>
                </div>

                {/* Main text */}
                <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
                    <div>Tomas Coox</div>
                    <div className="text-3xl mt-4">
                        Creative Portfolio
                    </div>
                </h1>

                {/* Subtext */}
                <div className="max-w-xl mx-auto text-gray-300 leading-relaxed space-y-4">
                    <p className="text-wrap-balance text-pretty">
                        I am a versatile creative professional crafting experiences through web development, music, graphic&nbsp;design, plus interactive&nbsp;media.
                    </p>
                    <p className="text-wrap-balance text-pretty">
                        My expertise spans engaging web solutions alongside musical compositions. This background brings natural rhythm into my&nbsp;projects, transforming static designs into dynamic&nbsp;experiences.
                    </p>
                    <p className="text-wrap-balance text-pretty">
                        Together, these skills create immersive experiences across contemporary&nbsp;media.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hero
