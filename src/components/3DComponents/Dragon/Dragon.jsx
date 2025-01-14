import React, { act, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Dragon = ({ boneRef, animationIndex, onAnimationEnd, firstRender, forceAnimationUseStateTrigger }) => {
  const { scene, animations } = useGLTF('/Dragon.glb');
  // console.log  (animations); // Log the animations array to see available animations
  const ref = useRef();
  const mixer = useRef();

  useEffect(() => {
    if (animations.length && !mixer.current) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[animationIndex]);
      action.reset()
      action.time = 62;
      action.play();
      action.setLoop(THREE.LoopOnce); // Play the animation once
      action.clampWhenFinished = true;
    }
  }, [scene, animations, animationIndex]);

  useEffect(()=>{
    function handleAnimationEnd() {
    // console.log('Animation finished');
     onAnimationEnd();
    }
    if(mixer.current){
        mixer.current.addEventListener('finished', handleAnimationEnd);
    }
    return () => mixer.current.removeEventListener('finished', handleAnimationEnd);
  },[mixer.current])

  useEffect(() => {
    // Set up shadow casting and receiving
    scene.traverse((child) => {
      child.frustumCulled = false;

      if (child.isMesh) {
        child.castShadow = true; // Enable shadow casting
        child.receiveShadow = true; // Enable shadow receiving

        // Optional: Configure material emissive properties
        const material = child.material;
        if (material && material.isMeshStandardMaterial) {
          material.emissive = new THREE.Color('#ffffff');
          material.emissiveIntensity = 0.01;
        }
      }

      // Store a reference to a specific bone
      if (child.isBone && child.name === 'Bip001-Neck_08') {
        boneRef.current = child;
      }
    });
  }, [scene, boneRef]);

  useEffect(() => {
    if(mixer.current && !firstRender.current){
        mixer.current.stopAllAction();
        const action = mixer.current.clipAction(animations[animationIndex]);
        action.reset()
        if(animationIndex===2){
            action.time = 30;
        } else if(animationIndex===1){
            action.time = 5;
        } else if(animationIndex===4){
            action.time = 72;
        } else if(animationIndex===5){
            action.time = 81;
        } else if(animationIndex===6){
            action.time = 98;
        } else if(animationIndex===7){
            action.time = 114;
        } else if(animationIndex===8){
            action.time = 118;
        }else {
            action.time = 0;
        }
        action.play();
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
    }
  },[forceAnimationUseStateTrigger]);

  useFrame((_, delta) => mixer.current?.update(delta)); // Update the mixer

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.05}
      position={[0, 1.2, -0.68]}
      rotation={[0, -Math.PI / 4, 0]}
    />
  );
};

export default Dragon;
