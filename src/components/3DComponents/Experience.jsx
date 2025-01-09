import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Dragon from './dragon/dragon';
import { Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import Portal from './Portal/Portal';

function DragonCameraController({ mountDragon, boneRef, setAnimationIndex, originalPositionRef, animationIndex }) {
  const { camera } = useThree();
  const isAnimationPlaying = useRef(false);

  useEffect(() => {
    if (mountDragon && boneRef.current) {
      const bonePosition = boneRef.current.getWorldPosition(new THREE.Vector3());
      const direction = new THREE.Vector3(0,-1,-1)
        .subVectors(camera.position, bonePosition)
        .normalize();
      const targetPosition = bonePosition.clone().add(direction.multiplyScalar(0.5));
      gsap.to(camera.position, {
        x: -targetPosition.x,
        y: targetPosition.y,
        z: -targetPosition.z,
        duration: 1,
        onUpdate: () => {
          camera.lookAt(bonePosition);
        },
        onComplete: () => {
          if (animationIndex!==7) {
            setAnimationIndex(7);
            setForceAnimationUseStateTrigger(prev => !prev);
            firstRender.current = false;
          } 
          isAnimationPlaying.current = true;
        },
      });
    } else {
      const originalPosition = originalPositionRef.current;
      gsap.to(camera.position, {
        x: originalPosition.x,
        y: originalPosition.y,
        z: originalPosition.z,
        duration: 2,
        onUpdate: () => {
          camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
      });
    }
  }, [mountDragon, boneRef, camera, originalPositionRef]);

//   useFrame(() => {
//     if (isAnimationPlaying.current) {
//       const bonePosition = boneRef.current.getWorldPosition(new THREE.Vector3());
//       const direction = new THREE.Vector3(0,-1,-1)
//         .subVectors(camera.position, bonePosition)
//         .normalize();
//       const targetPosition = bonePosition.clone().add(direction.multiplyScalar(0.5));
//       camera.lookAt(bonePosition);
//       camera.current.object.position.copy(targetPosition);
//       camera.current.update();
//     }
//   });

  return <OrbitControls enableZoom={true}/>;
}

function Experience({ mountDragon, explore3D, setMountDragon }) {
  const boneRef = useRef();
  const firstRender = useRef(true);
  const originalPositionRef = useRef(new THREE.Vector3(-3.5, -0.25, 4.5)); // Store the original camera position
  const [animationIndex, setAnimationIndex] = useState(7);
  const [forceAnimationUseStateTrigger, setForceAnimationUseStateTrigger] = useState(false);
//   const validAnimations = [7];
  const validAnimations = [0,1,7,9,11,15,18,19];

  const onAnimationEnd = () => {
    if(animationIndex===7 && mountDragon) {
      setMountDragon(false);
    }
    const curAnimation = validAnimations[Math.floor(Math.random() * validAnimations.length)];
    setAnimationIndex(curAnimation);
    setForceAnimationUseStateTrigger(prev => !prev);
    firstRender.current = false;
    console.log("curAnimation",curAnimation);
  }

  return (
    <Canvas className="bg-black"
      camera={{ position: originalPositionRef.current, near: 0.01 }}
    >
      <ambientLight intensity={10} />
      <spotLight position={[0, 0, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[10, 10, 10]} intensity={1000} />
      <pointLight position={[10, 10, -10]} intensity={1000} />
      <pointLight position={[-10, -10, -10]} intensity={1000} />
      <Suspense fallback={null}>
        <Dragon 
            boneRef={boneRef} 
            animationIndex={animationIndex} 
            onAnimationEnd={onAnimationEnd}
            firstRender={firstRender}
            forceAnimationUseStateTrigger={forceAnimationUseStateTrigger}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Portal />
      </Suspense>
      <DragonCameraController
        mountDragon={mountDragon}
        boneRef={boneRef}
        setAnimationIndex={setAnimationIndex}
        originalPositionRef={originalPositionRef}
        animationIndex={animationIndex}
      />
      <OrbitControls enableRotate={false} enablePan={true} enableZoom={false} />
      <axesHelper args={[5]} />
    </Canvas>
  );
}

export default Experience;
