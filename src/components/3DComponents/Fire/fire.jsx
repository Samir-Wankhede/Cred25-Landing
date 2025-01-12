import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const generateFlareTexture = () => {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, 'rgba(255, 200, 50, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 80, 20, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 20, 0, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
};

const FireParticles = ({
  position = [0, -1.5, 0],
  planeWidth = 25,
  planeHeight = 25,
  particleCount = 250,
  particleSize = 0.25,
  height = 20,
  speed = 0.12,
}) => {
  const particles = useRef();

  const flareTexture = useMemo(() => generateFlareTexture(), []);

  const particleGroups = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);
    const lifetimes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * planeWidth;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * planeHeight;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.003 * height * speed;
      velocities[i * 3 + 1] = (Math.random() * 0.005 + 0.005) * height * speed;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003 * height * speed;

      const mixed = Math.random();
      colors[i * 3] = 1; // Red
      colors[i * 3 + 1] = mixed * 0.7; // Orange
      colors[i * 3 + 2] = mixed * 0.1; // Blue hint

      opacities[i] = Math.random() * 0.5 + 0.5;
      lifetimes[i] = Math.random();
    }

    return { positions, colors, velocities, opacities, lifetimes };
  }, [particleCount, planeWidth, planeHeight, height, speed]);

  useFrame((state, delta) => {
    const { positions, velocities, opacities, lifetimes } = particleGroups;
    const count = positions.length / 3;

    for (let i = 0; i < count; i++) {
      lifetimes[i] += delta * 0.5 * speed;

      const swirl = Math.sin(lifetimes[i]) * 0.002 * height * speed;
      positions[i * 3] += velocities[i * 3] + swirl;
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2] + swirl;

      const currentHeight = positions[i * 3 + 1];
      const fadeStart = height * 0.3;
      const fadeEnd = height * 0.8;
      let heightFade = 1;

      if (currentHeight > fadeStart) {
        heightFade = 1 - ((currentHeight - fadeStart) / (fadeEnd - fadeStart));
      }

      opacities[i] = Math.max(0, heightFade) * 0.8;

      if (currentHeight > height || opacities[i] < 0.05) {
        const x = (Math.random() - 0.5) * planeWidth;
        const z = (Math.random() - 0.5) * planeHeight;

        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;

        lifetimes[i] = 0;
      }
    }

    particles.current.geometry.attributes.position.needsUpdate = true;
    particles.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <points ref={particles} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleGroups.positions.length / 3}
          array={particleGroups.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleGroups.colors.length / 3}
          array={particleGroups.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={particleGroups.opacities.length}
          array={particleGroups.opacities}
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
        map={flareTexture}
      />
    </points>
  );
};

export default FireParticles;
