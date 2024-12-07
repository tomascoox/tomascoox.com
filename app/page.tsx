'use client'

import Hero from '@/components/Hero'
import Background3D from '@/components/Background3D'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IconCode, IconMusic, IconPalette } from '@tabler/icons-react'

export default function Home() {
    const { scrollYProgress } = useScroll()

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

                {/* Web Development Section */}
                <section className="min-h-screen w-full bg-[#030B17] flex items-center">
                    <motion.div 
                        className="screen-max-width px-8"
                        style={{ 
                            x: useTransform(scrollYProgress, [0.1, 0.25], ['100%', '0%'])
                        }}
                    >
                        <div className="mb-6">
                            <IconCode size={48} className="text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Web Development
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-w-2xl">
                            Crafting modern web experiences with cutting-edge technologies. From responsive designs to interactive applications, I bring ideas to life through clean, efficient code.
                        </p>
                    </motion.div>
                </section>

                {/* Music Production Section */}
                <section className="min-h-screen w-full bg-[#0F0817] flex items-center">
                    <motion.div 
                        className="screen-max-width px-8"
                        style={{ 
                            x: useTransform(scrollYProgress, [0.4, 0.55], ['-100%', '0%'])
                        }}
                    >
                        <div className="mb-6">
                            <IconMusic size={48} className="text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Music Production
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-w-2xl">
                            Creating immersive soundscapes and compositions. My musical background adds rhythm and harmony to every project, blending technical precision with creative expression.
                        </p>
                    </motion.div>
                </section>

                {/* Digital Design Section */}
                <section className="min-h-screen w-full bg-[#071710] flex items-center">
                    <motion.div 
                        className="screen-max-width px-8"
                        style={{ 
                            x: useTransform(scrollYProgress, [0.7, 0.85], ['100%', '0%'])
                        }}
                    >
                        <div className="mb-6">
                            <IconPalette size={48} className="text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Digital Design
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-w-2xl">
                            Transforming concepts into visually stunning experiences. Combining artistic vision with technical expertise to create memorable and impactful digital designs.
                        </p>
                    </motion.div>
                </section>
            </div>
        </main>
    )
}
