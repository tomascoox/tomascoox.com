import React from 'react'
import { motion } from 'framer-motion'

export const Spotlights: React.FC = () => {
    const spotlightCount = 10

    return (
        <div className="absolute inset-0 overflow-visible">
            {Array.from({ length: spotlightCount }).map((_, index) => {
                const angle = -43 + (index * 90) / (spotlightCount - 1)
                const randomDelay = Math.random() * 5

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 7,
                            delay: randomDelay,
                            ease: 'easeInOut',
                        }}
                        className="absolute -top-[11vh] left-1/2 w-[200vh] h-[200vh]"
                        style={{
                            transformOrigin: 'top center',
                            transform: `translateX(-50%) rotate(${angle}deg)`,
                            background:
                                'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
                            clipPath:
                                'polygon(49.98% 10%, 50.02% 20%, 51% 90%, 40% 100%)',
                            boxShadow: '0 0 20px 10px rgba(255,255,255,0.3)',
                            filter: 'blur(30px)', // Added blur filter
                        }}
                    />
                )
            })}
        </div>
    )
}
