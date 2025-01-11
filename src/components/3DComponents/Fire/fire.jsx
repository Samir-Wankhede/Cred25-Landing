import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const FireParticles = ({
  position = [0, -1.5, 0],
  planeWidth = 25,
  planeHeight = 25,
  particleCount = 250,
  particleSize = 0.38,
  height = 20,
  speed = 0.12, 
}) => {
   
  const particles = useRef();
  
  const flameTextures = useMemo(() => [
    useLoader(THREE.TextureLoader, "flame1.png"),
    useLoader(THREE.TextureLoader, "flame2.png"),
    useLoader(THREE.TextureLoader, "flame3.png"),
    useLoader(THREE.TextureLoader, "flame4.png")
  ], []);

  const particleGroups = useMemo(() => {
    const particlesPerGroup = Math.ceil(particleCount / 4);
    
    return flameTextures.map(() => ({
      positions: new Float32Array(particlesPerGroup * 3),
      colors: new Float32Array(particlesPerGroup * 3),
      velocities: new Float32Array(particlesPerGroup * 3),
      opacities: new Float32Array(particlesPerGroup),
      lifetimes: new Float32Array(particlesPerGroup)
    }));
  }, [particleCount]);

  useMemo(() => {
    particleGroups.forEach(group => {
      const count = group.positions.length / 3;
      
      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * planeWidth;
        const y = (Math.random() - 0.5) * height;
        const z = (Math.random() - 0.5) * planeHeight;
        
        group.positions[i * 3] = x;
        group.positions[i * 3 + 1] = y;
        group.positions[i * 3 + 2] = z;
        
        group.velocities[i * 3] = (Math.random() - 0.5) * 0.003 * height * speed;
        group.velocities[i * 3 + 1] = (Math.random() * 0.005 + 0.005) * height * speed;
        group.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003 * height * speed;
        
        const mixed = Math.random();
        group.colors[i * 3] = 1; // Red
        group.colors[i * 3 + 1] = mixed * 0.7; // More orange
        group.colors[i * 3 + 2] = mixed * 0.1; // Slight blue
        
        group.opacities[i] = Math.random() * 0.5 + 0.5;
        group.lifetimes[i] = Math.random();
      }
    });
  }, [particleGroups, planeWidth, planeHeight, height, speed]);
  
  useFrame((state, delta) => {
    particleGroups.forEach((group, groupIndex) => {
      const particleSystem = particles.current.children[groupIndex];
      const positions = particleSystem.geometry.attributes.position.array;
      const opacityArray = particleSystem.geometry.attributes.opacity.array;
      const count = positions.length / 3;
      
      for (let i = 0; i < count; i++) {
        group.lifetimes[i] += delta * 0.5 * speed;
        
        const swirl = Math.sin(group.lifetimes[i]) * 0.002 * height * speed;
        positions[i * 3] += group.velocities[i * 3] + swirl;
        positions[i * 3 + 1] += group.velocities[i * 3 + 1];
        positions[i * 3 + 2] += group.velocities[i * 3 + 2] + swirl;
        
        const currentHeight = positions[i * 3 + 1];
        const fadeStart = height * 0.3;
        const fadeEnd = height * 0.8;
        let heightFade = 1;
        
        if (currentHeight > fadeStart) {
          heightFade = 1 - ((currentHeight - fadeStart) / (fadeEnd - fadeStart));
        }
        
        opacityArray[i] = Math.max(0, heightFade) * group.opacities[i];
        
        if (currentHeight > height || opacityArray[i] < 0.05) {
          const x = (Math.random() - 0.5) * planeWidth;
          const z = (Math.random() - 0.5) * planeHeight;
          
          positions[i * 3] = x;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = z;
          
          group.opacities[i] = Math.random() * 0.5 + 0.5;
          group.lifetimes[i] = 0;
        }
      }
      
      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.geometry.attributes.opacity.needsUpdate = true;
    });
  });
  
  return (
    <group position={position} ref={particles}>
      {particleGroups.map((group, index) => (
        <points key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={group.positions.length / 3}
              array={group.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={group.colors.length / 3}
              array={group.colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-opacity"
              count={group.opacities.length}
              array={group.opacities}
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
            map={flameTextures[index]}
          />
        </points>
      ))}
    </group>
  );
};

export default FireParticles;