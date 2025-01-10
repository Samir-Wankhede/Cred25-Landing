import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react'
import { Sky } from '../Fog/fog';
import FireParticles from '../Fire/fire';

const Portal = () => {
  const { scene } = useGLTF('/Portal.glb');
  const ref = useRef();
  return (
    <>
    <primitive object={scene} ref={ref} scale={0.3} rotation={[0,Math.PI/2,0]} position={[-0.75,-2.75,-0.45]} />
    <Sky/>
    <FireParticles/>
    </>
  )
}

export default Portal;
