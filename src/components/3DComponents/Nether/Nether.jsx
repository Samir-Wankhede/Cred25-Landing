import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react'

const Nether = () => {
  const { scene } = useGLTF('/Nether4.glb');
  useEffect(()=>{
    scene.traverse((child)=>{
      child.frustumCulled = false;

      if (child.isMesh) {
        child.castShadow = true; // Enable shadow casting
        child.receiveShadow = true;
      }
    })
  },[scene])
  return (
    <primitive object={scene} scale={25} rotation={[0,-Math.PI/4,0]} position={[0.75,-2.68, 0]} />
  )
}

export default Nether;
