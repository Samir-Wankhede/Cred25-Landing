import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react'
import FireParticles from '../Fire/fire';
import  { Galaxy } from './NetherPortalParticles';

const Portal = () => {
  const { scene } = useGLTF('/Portal2.glb');
  const ref = useRef();
  return (
    <>
    <primitive object={scene} ref={ref} scale={0.3} rotation={[0,Math.PI/2,0]} position={[-0.75,-2.75,-0.45]} />
    <Galaxy portal_pos={[0,-0.5,0.1]} mesh_pos={[0, -0.5, 0]} light_pos  ={[0,-1,1]}/>  
    <Galaxy portal_pos={[0,-0.5,-1.7]} mesh_pos={[0, -0.5, -1.5]} light_pos  ={[0,-1,-2]} mesh_rotate={Math.PI}/>  
    <FireParticles/>
    </>
  )
}

export default Portal;
