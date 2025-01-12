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

function CameraController({originalPositionRef, startPositionRef, explore3D}){
  const { camera } = useThree();
  const firstAnimation = useRef(false);
  useEffect(()=>{
    if(!explore3D){
      const originalPosition = originalPositionRef.current;
      gsap.to(camera.position, {
        x: originalPosition.x,
        y: originalPosition.y,
        z: originalPosition.z,
        duration: 1.5,
        onUpdate: () => {
          camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
        onComplete: () => {
          firstAnimation.current = true;
        },
      });
    }else{
      const originalPosition = startPositionRef.current;
      gsap.to(camera.position, {
        x: -originalPosition.x,
        y: originalPosition.y,
        z: originalPosition.z + 3,
        duration: 1,
        onUpdate: () => {
          camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
      });
    }
    
  },[explore3D])

  useFrame((state)=>{
    if(
      !explore3D && 
      firstAnimation.current
    ){
      const originalPosition = originalPositionRef.current;
      gsap.to(camera.position, {
        x: originalPosition.x + state.pointer.x,
        y: originalPosition.y + state.pointer.y,
        z: originalPosition.z,
        duration: 1,
        onUpdate: () => {
          camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
      });
    }
  })

  // function PortalCameraController({ checkPortal, originalPositionRef, setPortalBackgroundColor }) {
  //   const { camera } = useThree();
  
  //   useEffect(() => {
  //     console.log("PortalCameraController Triggered. checkPortal:", checkPortal);
  
  //     if (checkPortal) {
  //       // Move the portal center to a reasonable spot
  //       const portalCenter = new THREE.Vector3(-1.5, 0.25, 7); 
  //       console.log("Animating camera to portalCenter:", portalCenter);
  //       console.log("Camera Position: ", camera.position);
  //       console.log("Current Camera FOV:", camera.fov);
  
  //       // Animate camera position to portal center
  //       gsap.to(camera.position, {
  //         x: portalCenter.x,
  //         y: portalCenter.y,
  //         z: portalCenter.z-4,
  //         duration: 2,
  //         ease: 'power3.inOut',
  //         onUpdate: () => {
  //           camera.lookAt(portalCenter); 
  //         },
  //         onComplete: () => {
  //           console.log("Portal animation complete. Changing background.");
  //           setPortalBackgroundColor('#0000ff'); // Change background color blue abhi ke liye
  //         },
  //       });
  
  //       // // Animate FOV to zoom in on the portal
  //       // gsap.to(camera, {
  //       //   fov: 50, // Zoom in
  //       //   duration: 2,
  //       //   ease: 'power3.inOut',
  //       //   onUpdate: () => camera.updateProjectionMatrix(),
  //       // });
  
  //     } else {
  //       const originalPosition = originalPositionRef.current;
  //       console.log("Resetting camera pos", originalPosition);
  
  //       // Animate camera position back to the og position
  //       gsap.to(camera.position, {
  //         x: originalPosition.x,
  //         y: originalPosition.y,
  //         z: originalPosition.z,
  //         duration: 2,
  //         ease: 'power3.inOut',
  //         onUpdate: () => {
  //           camera.lookAt(new THREE.Vector3(0, 0, 0)); // Reset camera lookAt
  //         },
  //         onComplete: () => {
  //           setPortalBackgroundColor('black'); // Reset background color
  //         },
  //       });
  
  //       // // Animate FOV back to the normal value
  //       // gsap.to(camera, {
  //       //   fov: 75, // Normal FOV
  //       //   duration: 2,
  //       //   ease: 'power3.inOut',
  //       //   onUpdate: () => camera.updateProjectionMatrix(),
  //       // });
  //     }
  //   }, [checkPortal, camera, originalPositionRef, setPortalBackgroundColor]); 

  //   return null;
  // }
  
  
  
  return ( 
    <OrbitControls 
      enableRotate={explore3D? true : false} 
      enablePan={false} 
      enableZoom={explore3D ? true : false} 
      minDistance={5} 
      maxDistance={10} 
      maxPolarAngle={Math.PI / 1.8}
      minPolarAngle={Math.PI / 4}
    />
  )
}

function Experience({ mountDragon, setMountDragon,  explore3D}) {
  // checkPortal ka parameter add

  const boneRef = useRef();
  const firstRender = useRef(true);
  const originalPositionRef = useRef(new THREE.Vector3(-1.5, 0.25, 7)); // Store the original camera position
  const startPositionRef = useRef(new THREE.Vector3(-2.5, 3, 4.5)); // Store the original camera position
  const [animationIndex, setAnimationIndex] = useState(7);

  const [forceAnimationUseStateTrigger, setForceAnimationUseStateTrigger] = useState(false);
  const validAnimations = [0,1,7,9,11,15,18,19];
  //const [backgroundColor, setBackgroundColor] = useState('black'); // for portal temp bg color 

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
      camera={{ position: startPositionRef.current, near: 0.01 } }
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog('black', 5, 20) 
      }}

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
      { !explore3D && mountDragon && 
        <DragonCameraController
          mountDragon={mountDragon}
          boneRef={boneRef}
          setAnimationIndex={setAnimationIndex}
          originalPositionRef={originalPositionRef}
          animationIndex={animationIndex}
        />
      }
      {
        !mountDragon &&
        <CameraController
          originalPositionRef={originalPositionRef}
          startPositionRef={startPositionRef}
          explore3D={explore3D}
        />
      }
       {/* {checkPortal && (
          <PortalCameraController
            checkPortal={checkPortal}
            originalPositionRef={originalPositionRef}
            setPortalBackgroundColor={setBackgroundColor}
          />
        )} */}
      <axesHelper args={[5]} />
    </Canvas>
  );
}

export default Experience;
