'use client'
import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '../../utils/cn'

interface TextGenerateEffectProps {
    words: string
    className?: string
    onAnimationComplete?: () => void
}

export const TextGenerateEffect = ({
    words,
    className,
}: TextGenerateEffectProps) => {
    const [scope, animate] = useAnimate()
    const wordsArray = words.split(' ')
    useEffect(() => {
        animate(
            'span',
            {
                opacity: 1,
            },
            {
                duration: 2,
                delay: stagger(0.2),
            }
        )
    }, [animate])

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className={`${
                                idx > 5
                                    ? 'text-blue-600'
                                    : 'text-white'
                            } opacity-0`}
                        >
                            {word}{' '}
                        </motion.span>
                    )
                })}
            </motion.div>
        )
    }

    return (
        <div className={cn('font-bold', className)}>
            <div className="my-4">
                <div className="text-white leading-tight tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    )
}
