import { Points, Point, useTexture, Plane } from '@react-three/drei'
import React, {  useRef } from 'react'
import * as THREE from 'three'
import colors from 'nice-color-palettes'
import { useFrame } from '@react-three/fiber'

const particleTextures = [
  'textures/1.png',
  
]

const palette = colors[Math.floor(Math.random() * colors.length)]
export const Galaxy=({portal_pos, mesh_pos, light_pos, mesh_rotate=0})=> {
    
    const count = 1400
    const size =0.25
    const textureType = 0
    const radius=1.6
    const branches=5
    const spin=4
    const randomness= 0.25
    const randomnessPower = 9
    const rotationSpeed = 0.6
    const insideColor="#4a0563"
    const outsideColor = "#4a0563"
  
  const particlesRef = useRef()
  const particleTexture = useTexture(particleTextures[textureType])
  useFrame((state) => (particlesRef.current.rotation.z = state.clock.getElapsedTime() * rotationSpeed))
  return (
    <>
    <mesh>
  <Plane scale={[2, 2.7, 0]} position={mesh_pos} rotation={[mesh_rotate,0,0]}>
    <meshStandardMaterial color="#490363" />
    
  </Plane>
</mesh>
    <pointLight intensity={40} position={light_pos} color={"#ae1ee3"}/>

    <Points ref={particlesRef} limit={10000} position={portal_pos}>
      <pointsMaterial
        size={size}
        transparent
        opacity={4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        vertexColors
        map={particleTexture}
        alphaMap={particleTexture}
      />
      {Array.from({ length: count }).map((_, i) => {
        const pRadius = Math.random() * radius
        const sAngle = pRadius * spin
        const bAngle = ((i % branches) / branches) * Math.PI * 2
        const rndX = Math.pow(Math.random(), randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * randomness * radius
        const rndY = Math.pow(Math.random(), randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * randomness * radius
        const rndZ = Math.pow(Math.random(), randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * randomness * radius
        const position = [
           
            Math.cos(bAngle + sAngle) * pRadius + rndX, 
           
            Math.sin(bAngle + sAngle) * pRadius + rndY,
            rndZ
        ]
        const color = new THREE.Color(insideColor).lerp(new THREE.Color(outsideColor), pRadius / radius)
        return <Point key={i} position={position} color={color} />
      })}
    </Points>
    </>
  )
}
