'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// Floating particles background
function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.Points>(null!)
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return temp
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = time * 0.1
      mesh.current.rotation.y = time * 0.15
    }
  })

  return (
    <Points ref={mesh} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#64ffda"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

// Floating geometric shapes
function FloatingShape({ position, color, shape = 'box' }: { 
  position: [number, number, number], 
  color: string, 
  shape?: 'box' | 'sphere' | 'octahedron' 
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      {shape === 'sphere' && <sphereGeometry args={[0.5, 16, 16]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[0.5]} />}
      {shape === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// Animated wireframe grid
function Grid() {
  const gridRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (gridRef.current) {
      gridRef.current.rotation.x = time * 0.1
      gridRef.current.rotation.z = time * 0.05
    }
  })

  return (
    <group ref={gridRef} position={[0, 0, -5]}>
      <gridHelper args={[20, 20, '#ff6b9d', '#ff6b9d']} />
    </group>
  )
}

// Main 3D Scene
export default function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a2a 100%)' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#64ffda" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ff6b9d" intensity={0.5} />
        <pointLight position={[10, -10, 10]} color="#ffd93d" intensity={0.5} />
        
        <Particles count={800} />
        
        {/* Floating geometric shapes */}
        <FloatingShape position={[-4, 2, 0]} color="#64ffda" shape="box" />
        <FloatingShape position={[4, -1, -2]} color="#ff6b9d" shape="sphere" />
        <FloatingShape position={[-2, -3, 1]} color="#ffd93d" shape="octahedron" />
        <FloatingShape position={[3, 3, -1]} color="#9d65ff" shape="box" />
        <FloatingShape position={[-5, -1, 2]} color="#ff9d65" shape="sphere" />
        <FloatingShape position={[1, 4, -3]} color="#65ff9d" shape="octahedron" />
        
        <Grid />
      </Canvas>
    </div>
  )
}
