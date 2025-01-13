import { useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react'
import FireParticles from '../Fire/fire';
import  { Galaxy } from './NetherPortalParticles';

const Portal = () => {
  const { scene } = useGLTF('/Portal.glb');
  const ref = useRef();
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
    <>
    <primitive object={scene} ref={ref} scale={0.3} rotation={[0,-Math.PI/2,0]} position={[0.75,-2.68,-1]} />
    <Galaxy portal_pos={[0,-0.5,0.1]} mesh_pos={[0, -0.5, 0]} light_pos={[0,-1,1]}/>  
    <Galaxy portal_pos={[0,-0.5,-1.7]} mesh_pos={[0, -0.5, -1.5]} light_pos={[0,-1,-2]} mesh_rotate={Math.PI}/>  
    <FireParticles/>
    </>
  )
}

export default Portal;
