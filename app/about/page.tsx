'use client'

import React from 'react'
import Background3D from '@/components/Background3D'

export default function AboutPage() {
    return (
        <main className="relative">
            <div className="fixed inset-0 z-0">
                <Background3D />
            </div>
            
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">
                        about me
                    </h1>
                    <div className="space-y-6 text-gray-300">
                        <p className="text-wrap-balance text-pretty">
                            I am a creative developer based in Sweden, passionate about crafting digital experiences that merge technology with artistic expression.
                        </p>
                        <p className="text-wrap-balance text-pretty">
                            With a background in both development and music, I bring a unique perspective to every project, focusing on creating harmonious and engaging user experiences.
                        </p>
                        <p className="text-wrap-balance text-pretty">
                            My approach combines clean code with creative problem-solving, always striving to push the boundaries of what&apos;s possible in digital spaces.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
} 