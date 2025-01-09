import React, { act, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Dragon = ({ boneRef, animationIndex, onAnimationEnd, firstRender, forceAnimationUseStateTrigger }) => {
  const { scene, animations } = useGLTF('/Dragon.glb');
  console.log  (animations); // Log the animations array to see available animations
  const ref = useRef();
  const mixer = useRef();

  useEffect(() => {
    if (animations.length && !mixer.current) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[animationIndex]);
      action.reset()
      action.time = 62;
      // action.time = 64; //for front view
      action.play();
      action.setLoop(THREE.LoopOnce); // Play the animation once
    }
  }, [scene, animations, animationIndex]);

  useEffect(()=>{
    function handleAnimationEnd() {
     console.log('Animation finished');
     onAnimationEnd();
    }
    if(mixer.current){
        mixer.current.addEventListener('finished', handleAnimationEnd);
    }
    return () => mixer.current.removeEventListener('finished', handleAnimationEnd);
  },[mixer.current])

  useEffect(() => {
    scene.traverse((child) => {
      child.frustumCulled = false;
      if(child.isBone) {
        console.log(child.name);
      }
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
        if(animationIndex==7){
            action.time = 30;
        } else if(animationIndex==1){
            action.time = 5;
        } else if(animationIndex==9){
            action.time = 70;
        } else if(animationIndex==11){
            action.time = 80;
        } else if(animationIndex==15){
            action.time = 95;
        } else if(animationIndex==18){
            action.time = 112;
        } else if(animationIndex==19){
            action.time = 117.5;
        }else {
            action.time = 0;
        }
        action.play();
        action.setLoop(THREE.LoopOnce);
    }
  },[forceAnimationUseStateTrigger]);

  useFrame((_, delta) => mixer.current?.update(delta)); // Update the mixer

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.025}
      position={[0, 1.2, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    />
  );
};

export default Dragon;
