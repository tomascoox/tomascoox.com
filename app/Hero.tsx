'use client'

import React from 'react'
import Image from 'next/image'
import { Spotlights } from '../components/ui/Spotlights'
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect'
import { motion, AnimatePresence } from 'framer-motion'

const fullParagraph =
    'I do this through songwriting, live musicianship, web- and app-development, motion graphics and animation and graphic design and layout. This portfolio is my personal playground in the field of webdevelopment and design.'

const paragraphWords = fullParagraph.split(/\s+/)

const Hero = () => {
    return (
        <div className="min-h-screen bg-black relative">
            <div className="absolute inset-0 overflow-visible">
                <Spotlights />
            </div>

            <div className="relative z-10 pt-20 pb-20">
                <div className="max-w-[90vw] md:max-w-2xl lg:max-w-[80vw] mx-auto">
                    <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 mx-auto">
                        WELCOME TO TOMASCOOX.COM
                    </h2>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10 mt-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 2,
                                delay: 1,
                                ease: 'easeInOut',
                            }}
                            className="w-60 h-60 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0 relative"
                        >
                            <div className="absolute inset-0 rounded-full bg-white opacity-40 blur-md"></div>
                            <div className="w-full h-full rounded-full overflow-hidden relative z-10">
                                <Image
                                    src="/tomas-cool-solglasogon.jpg"
                                    alt="Tomas Coox"
                                    fill
                                    sizes="(max-width: 768px) 40vw, (max-width: 1200px) 60vw, 80vw"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                    className="filter grayscale"
                                />
                            </div>
                        </motion.div>

                        <div className="md:flex-1 flex flex-col justify-start">
                            <TextGenerateEffect
                                words="I love to create useful and beautiful things."
                                className="text-center md:text-left text-[32px] md:text-4xl lg:text-5xl leading-tight"
                            />
                            <AnimatePresence>
                                {true && (
                                    <div className="text-center md:text-left md:tracking-wider mb-4 text-sm md:text-base lg:text-lg mt-4 text-white">
                                        {paragraphWords.map(
                                            (word, index) => (
                                                <React.Fragment
                                                    key={index}
                                                >
                                                    <motion.span
                                                        className="inline-block"
                                                        initial={{
                                                            opacity: 0,
                                                            x: 100,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.8,
                                                            delay:
                                                                2.5 +
                                                                index *
                                                                    0.05,
                                                            ease: 'easeOut',
                                                        }}
                                                    >
                                                        {word}
                                                    </motion.span>{' '}
                                                </React.Fragment>
                                            )
                                        )}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
