'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instance, Instances } from '@react-three/drei'
import { Group, Color } from 'three'

function Stars() {
    const group = useRef<Group>(null)
    const starCount = 2000

    useFrame(() => {
        if (!group.current) return
        group.current.rotation.y += 0.0001
    })

    return (
        <group ref={group}>
            <Instances limit={starCount}>
                <sphereGeometry args={[0.003, 8, 8]} />
                <meshBasicMaterial transparent opacity={0.8} />
                {Array.from({ length: starCount }, (_, i) => {
                    const x = (Math.random() - 0.5) * 10
                    const y = (Math.random() - 0.5) * 10
                    const z = (Math.random() - 0.5) * 5
                    
                    // Calculate distance from center for opacity
                    const distance = Math.sqrt(x * x + y * y + z * z)
                    const opacity = 1 - (distance / 12)
                    const scale = 1 - (distance / 14)

                    return (
                        <Instance 
                            key={i} 
                            position={[x, y, z]} 
                            scale={[scale, scale, scale]}
                            color={new Color().setHSL(0, 0, opacity * 0.8)}
                        />
                    )
                })}
            </Instances>
        </group>
    )
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 h-[150vh]">
            <Canvas
                dpr={1}
                gl={{
                    antialias: false,
                    powerPreference: 'default',
                    alpha: false,
                    stencil: false,
                    depth: false
                }}
                camera={{ 
                    position: [0, 0, 6],
                    fov: 45,
                    near: 0.1,
                    far: 100
                }}
                style={{ background: 'black' }}
            >
                <Stars />
            </Canvas>
        </div>
    )
} 