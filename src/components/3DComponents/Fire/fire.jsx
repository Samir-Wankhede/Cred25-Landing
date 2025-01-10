import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FireParticles = ({
  position = [0, -1.5, 0],
  planeWidth = 25,
  planeHeight = 25,
  particleCount = 500,
  particleSize = 0.07,
  height = 20,
  speed = 0.12, 
}) => {
  const particles = useRef();
  
  const [positions, colors, velocities, opacities, lifetimes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);
    const lifetimes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Position - start in a rectangular pattern matching plane size
      const x = (Math.random() - 0.5) * planeWidth;
      const z = (Math.random() - 0.5) * planeHeight;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.003 * height * speed;
      velocities[i * 3 + 1] = (Math.random() * 0.005 + 0.005) * height * speed;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003 * height * speed;
      
      const mixed = Math.random();
      colors[i * 3] = 1; // Red
      colors[i * 3 + 1] = mixed * 0.8; // More orange
      colors[i * 3 + 2] = mixed * 0.6; // Slight blue
      
      opacities[i] = Math.random() * 0.5 + 0.5;
      lifetimes[i] = Math.random();
    }
    
    return [positions, colors, velocities, opacities, lifetimes];
  }, [particleCount, planeWidth, planeHeight, height, speed]);
  
  useFrame((state, delta) => {
    const positions = particles.current.geometry.attributes.position.array;
    const opacityArray = particles.current.geometry.attributes.opacity.array;
    
    for (let i = 0; i < particleCount; i++) {
      // Lifetime progression scaled by speed
      lifetimes[i] += delta * 0.5 * speed;
      
      const swirl = Math.sin(lifetimes[i]) * 0.002 * height * speed;
      positions[i * 3] += velocities[i * 3] + swirl;
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2] + swirl;
      
      // Calculate height-based opacity
      const currentHeight = positions[i * 3 + 1];
      const fadeStart = height * 0.3;
      const fadeEnd = height * 0.8;
      let heightFade = 1;
      
      if (currentHeight > fadeStart) {
        heightFade = 1 - ((currentHeight - fadeStart) / (fadeEnd - fadeStart));
      }
      
      opacityArray[i] = Math.max(0, heightFade) * opacities[i];
      
      // Reset particles that go too high or become too transparent
      if (currentHeight > height || opacityArray[i] < 0.05) {
        const x = (Math.random() - 0.5) * planeWidth;
        const z = (Math.random() - 0.5) * planeHeight;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        
        opacities[i] = Math.random() * 0.5 + 0.5;
        lifetimes[i] = 0;
      }
    }
    
    particles.current.geometry.attributes.position.needsUpdate = true;
    particles.current.geometry.attributes.opacity.needsUpdate = true;
  });
  
  return (
    <group position={position}>
      
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-opacity"
            count={particleCount}
            array={opacities}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={particleSize}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export default FireParticles;