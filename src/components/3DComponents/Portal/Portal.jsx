import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react'
import FireParticles from '../Fire/fire';
import  { Galaxy } from './NetherPortalParticles';

const Portal = ({onClick}) => {
  const { scene } = useGLTF('/Portal.glb');
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
    <group onClick={onClick}>
    <primitive object={scene} scale={0.3} rotation={[0,-Math.PI/2,0]} position={[0.75,-2.68,-1]} />
    <Galaxy portal_pos={[0,-0.5,0.1]} mesh_pos={[0, -0.5, 0]} light_pos={[0,-1,1]}/>  
    <Galaxy portal_pos={[0,-0.5,-1.7]} mesh_pos={[0, -0.5, -1.5]} light_pos={[0,-1,-2]} mesh_rotate={Math.PI}/>  
    <FireParticles/>
    </group>
  )
}

export default Portal;
