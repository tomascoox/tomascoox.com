'use client'

import { motion } from 'framer-motion'
import { IconCode, IconMusic, IconPalette } from '@tabler/icons-react'
import React from 'react'

const sections = [
    {
        icon: IconCode,
        title: "Web Development",
        description: "Crafting modern web experiences with cutting-edge technologies. From responsive designs to interactive applications, I bring ideas to life through clean, efficient code.",
        color: "bg-[#030B17]"
    },
    {
        icon: IconMusic,
        title: "Music Production",
        description: "Creating immersive soundscapes and compositions. My musical background adds rhythm and harmony to every project, blending technical precision with creative expression.",
        color: "bg-[#0F0817]"
    },
    {
        icon: IconPalette,
        title: "Digital Design",
        description: "Transforming concepts into visually stunning experiences. Combining artistic vision with technical expertise to create memorable and impactful digital designs.",
        color: "bg-[#071710]"
    }
]

const AnimatedSection = () => {
    return (
        <div className="relative overflow-x-hidden">
            {sections.map((section, index) => (
                <motion.div
                    key={section.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`${section.color} min-h-screen w-screen flex items-center`}
                >
                    <div className="screen-max-width px-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.3 }}
                            className="mb-6"
                        >
                            <section.icon size={48} className="text-white" />
                        </motion.div>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.4 }}
                            className="text-3xl md:text-4xl font-bold mb-6"
                        >
                            {section.title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.5 }}
                            className="text-gray-300 leading-relaxed max-w-2xl"
                        >
                            {section.description}
                        </motion.p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default AnimatedSection 