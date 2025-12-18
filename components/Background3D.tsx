'use client'

import { useRef, useEffect, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instance, Instances, useGLTF } from '@react-three/drei'
import {
    Group,
    Color,
    Vector3,
    Mesh,
    DoubleSide,
    Material,
} from 'three'

// Preload the model to avoid loading it multiple times
useGLTF.preload('/spaceship.glb')

function Lights() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[0, 5, 5]}
                intensity={1}
                castShadow
            />
        </>
    )
}

function SpaceshipModel() {
    const { scene } = useGLTF('/spaceship.glb')
    const clonedScene = scene.clone()

    // Fix hollow appearance by setting material properties
    clonedScene.traverse(child => {
        if (child instanceof Mesh && child.material) {
            const material = child.material as Material
            material.side = DoubleSide
            material.needsUpdate = true
        }
    })

    return (
        <primitive
            object={clonedScene}
            scale={0.2}
            rotation={[Math.PI * 4, Math.PI * 4, Math.PI * 4]}
        />
    )
}

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
                <meshBasicMaterial
                    transparent
                    opacity={0.8}
                />
                {Array.from({ length: starCount }, (_, i) => {
                    const x = (Math.random() - 0.5) * 10
                    const y = (Math.random() - 0.5) * 10
                    const z = (Math.random() - 0.5) * 5

                    // Calculate distance from center for opacity
                    const distance = Math.sqrt(x * x + y * y + z * z)
                    const opacity = 1 - distance / 12
                    const scale = 1 - distance / 14

                    return (
                        <Instance
                            key={i}
                            position={[x, y, z]}
                            scale={[scale, scale, scale]}
                            color={new Color().setHSL(
                                0,
                                0,
                                opacity * 0.8
                            )}
                        />
                    )
                })}
            </Instances>
        </group>
    )
}

export default function Background3D() {
    const activePathsRef = useRef<Vector3[]>([])

    const isPathTooClose = (newPos: Vector3) => {
        const paths = activePathsRef.current || []
        return paths.some(existingPos => {
            const distance = newPos.distanceTo(existingPos)
            return distance < 3
        })
    }

    const updatePaths = (paths: Vector3[]) => {
        activePathsRef.current = paths
    }

    return (
        <div className="fixed inset-0 -z-10 h-[150vh]">
            <Canvas
                dpr={1}
                gl={{
                    antialias: false,
                    powerPreference: 'default',
                    alpha: false,
                    stencil: false,
                    depth: true,
                }}
                camera={{
                    position: [0, 0, 6],
                    fov: 45,
                    near: 0.1,
                    far: 100,
                }}
                style={{ background: 'black' }}
            >
                <Lights />
                <Stars />
                <Suspense fallback={null}>
                    <ShipController
                        activePathsRef={activePathsRef}
                        isPathTooClose={isPathTooClose}
                        updatePaths={updatePaths}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

function ShipController({
    activePathsRef,
    isPathTooClose,
    updatePaths,
}: {
    activePathsRef: React.MutableRefObject<Vector3[]>
    isPathTooClose: (pos: Vector3) => boolean
    updatePaths: (paths: Vector3[]) => void
}) {
    return (
        <>
            <Spaceship
                initialDelay={0}
                activePathsRef={activePathsRef}
                isPathTooClose={isPathTooClose}
                updatePaths={updatePaths}
                initialOffsetX={-10}
            />
            <Spaceship
                initialDelay={2}
                activePathsRef={activePathsRef}
                isPathTooClose={isPathTooClose}
                updatePaths={updatePaths}
                initialOffsetX={-10}
            />
            <Spaceship
                initialDelay={4}
                activePathsRef={activePathsRef}
                isPathTooClose={isPathTooClose}
                updatePaths={updatePaths}
                initialOffsetX={-10}
            />
        </>
    )
}

function Spaceship({
    initialDelay = 0,
    activePathsRef,
    isPathTooClose,
    updatePaths,
    initialOffsetX = -10,
}: {
    initialDelay: number
    activePathsRef: React.MutableRefObject<Vector3[]>
    isPathTooClose: (pos: Vector3) => boolean
    updatePaths: (paths: Vector3[]) => void
    initialOffsetX?: number
}) {
    const shipRef = useRef<Group>(null)
    const directionRef = useRef(new Vector3())
    const rotationRef = useRef(0)
    const speed = 0.003 + Math.random() * 0.002
    const [isVisible, setIsVisible] = useState(false)

    const resetShip = () => {
        if (!shipRef.current) return

        let startPosition: Vector3
        let attempts = 0
        do {
            startPosition = new Vector3(
                initialOffsetX,
                -4 + Math.random() * 8,
                0
            )
            attempts++
        } while (isPathTooClose(startPosition) && attempts < 10)

        shipRef.current.position.copy(startPosition)

        const currentPaths = activePathsRef.current || []
        const newPaths = [
            ...currentPaths.filter(
                pos => !pos.equals(shipRef.current!.position)
            ),
            startPosition.clone(),
        ]
        updatePaths(newPaths)

        const targetX = 7
        const targetY = -4 + Math.random() * 8

        directionRef.current
            .set(
                targetX - startPosition.x + (Math.random() - 0.5) * 4,
                targetY - startPosition.y + (Math.random() - 0.5) * 4,
                0
            )
            .normalize()

        // Make ship visible after position is set
        setIsVisible(true)
    }

    useEffect(() => {
        // Start invisible
        setIsVisible(false)

        if (initialDelay > 0) {
            setTimeout(resetShip, initialDelay * 1000)
        } else {
            resetShip()
        }
    }, [initialDelay])

    useFrame(() => {
        if (!shipRef.current || !isVisible) return

        shipRef.current.position.add(
            directionRef.current.clone().multiplyScalar(speed)
        )

        const angle = Math.atan2(
            directionRef.current.y,
            directionRef.current.x
        )

        rotationRef.current += 0.005

        shipRef.current.rotation.x =
            angle * 2 + Math.sin(rotationRef.current) * Math.PI * 0.5
        shipRef.current.rotation.y =
            Math.PI * 2 + rotationRef.current * 0.3
        shipRef.current.rotation.z =
            -angle * 3 + Math.cos(rotationRef.current) * Math.PI

        const pos = shipRef.current.position
        if (pos.x < -10 || pos.x > 7 || pos.y < -4 || pos.y > 4) {
            setIsVisible(false)
            const currentPaths = activePathsRef.current || []
            const newPaths = currentPaths.filter(
                p => !p.equals(shipRef.current!.position)
            )
            updatePaths(newPaths)
            resetShip()
        }
    })

    if (!isVisible) return null

    return (
        <group
            ref={shipRef}
            scale={[0.1, 0.1, 0.1]}
        >
            <Suspense
                fallback={
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <coneGeometry args={[0.5, 2, 8]} />
                        <meshBasicMaterial color="#4a9eff" />
                    </mesh>
                }
            >
                <SpaceshipModel />
            </Suspense>
        </group>
    )
}
