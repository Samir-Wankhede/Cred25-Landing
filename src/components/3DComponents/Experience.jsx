import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Dragon from './Dragon/Dragon';
import { Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import Portal from './Portal/Portal';
import Loader from './Loader/Loader';
import DragonLoader from './Loader/DragonLoader';
import Nether from './Nether/Nether';

function DragonCameraController({
  mountDragon,
  boneRef,
  setAnimationIndex,
  animationIndex,
  setForceAnimationUseStateTrigger
}) {
  const { camera } = useThree();
  const rotationQuaternion = useRef(new THREE.Quaternion());

  useEffect(() => {
    const Rotation = new THREE.Quaternion();
    Rotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 3);
    rotationQuaternion.current.copy(Rotation);
    if(animationIndex!==2){
      setAnimationIndex(2);
      setForceAnimationUseStateTrigger(prev => !prev);
    }
  }, [animationIndex]);

  const calculateIdealOffset = () => {
    const idealOffset = new THREE.Vector3(-1, -1.75, -1.75);
    const boneRotation = boneRef.current.getWorldQuaternion(new THREE.Quaternion());
    boneRotation.multiply(rotationQuaternion.current);
    const bonePosition = boneRef.current.getWorldPosition(new THREE.Vector3());
    idealOffset.applyQuaternion(boneRotation);
    idealOffset.add(bonePosition);
    return idealOffset;
  };

  const calculateIdealLookAt = () => {
    const idealLookAt = new THREE.Vector3(2, 1, 3);
    const boneRotation = boneRef.current.getWorldQuaternion(new THREE.Quaternion());
    boneRotation.multiply(rotationQuaternion.current);
    const bonePosition = boneRef.current.getWorldPosition(new THREE.Vector3());
    idealLookAt.applyQuaternion(boneRotation);
    idealLookAt.add(bonePosition);
    return idealLookAt;
  };

  const currentPosition = new THREE.Vector3();
  const currentLookAt= new THREE.Vector3();
  const t = 0.15;

  useFrame(() => {
    if (mountDragon) {
      currentLookAt.lerp(calculateIdealLookAt(), t);
      currentPosition.lerp(calculateIdealOffset(), t);
      camera.lookAt(currentLookAt);
      gsap.to(camera.position, {
        x: currentPosition.x,
        y: currentPosition.y,
        z: currentPosition.z,
        duration: 0.1,
      });
      camera.updateProjectionMatrix();
    }
  });

  return <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />;
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

function Experience({ mountDragon, explore3D, setMountDragon, setLoaded, loaded, setDragonLoaded }) {
  const boneRef = useRef();
  const firstRender = useRef(true);
  const originalPositionRef = useRef(new THREE.Vector3(-2.5, 0.15, 7)); // Store the original camera position
  const startPositionRef = useRef(new THREE.Vector3(-2.5, 3, 4.5)); // Store the original camera position
  const [animationIndex, setAnimationIndex] = useState(2);
  const [forceAnimationUseStateTrigger, setForceAnimationUseStateTrigger] = useState(false);

  const onAnimationEnd = () => {
    if(animationIndex===2){
      setMountDragon(false);
    }
    let curAnimation = Math.floor(Math.random() * 9);
    // let curAnimation = 2;
    if(curAnimation===3 || curAnimation===9) curAnimation -= 1;
    setAnimationIndex(curAnimation);
    setForceAnimationUseStateTrigger(prev => !prev);
    firstRender.current = false;
  }

  return (
    <Canvas className="bg-black"
      camera={{ position: startPositionRef.current, near: 0.01 } }
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog('black', 5, 17) 
      }}

    >
      <ambientLight intensity={1} />
      <spotLight position={[0, 0, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[7, 8, 8]} intensity={200} color={'red'} />
      <pointLight position={[0, 5, 2]} intensity={200} color={'#ff9c63'} />
      <pointLight position={[-2, 7 -2]} intensity={200} color={'orange'} />
      <pointLight position={[-3, -5, -5]} intensity={200} color={'orange'} />
      <Suspense fallback={<DragonLoader setDragonLoaded={setDragonLoaded} loaded={loaded}/>}>
        { loaded && 
          <Dragon 
            boneRef={boneRef} 
            animationIndex={animationIndex} 
            onAnimationEnd={onAnimationEnd}
            firstRender={firstRender}
            forceAnimationUseStateTrigger={forceAnimationUseStateTrigger}
          />
        }
      </Suspense>
      <Suspense fallback={<Loader setLoaded={setLoaded}/>}>
        <Portal />
        <Nether />
      </Suspense>
      {
        !mountDragon ?
        <CameraController
          originalPositionRef={originalPositionRef}
          startPositionRef={startPositionRef}
          explore3D={explore3D}
        />
        :
        <DragonCameraController 
          mountDragon={mountDragon}
          boneRef={boneRef}
          animationIndex={animationIndex}
          setAnimationIndex={setAnimationIndex}
          setForceAnimationUseStateTrigger={setForceAnimationUseStateTrigger}
        />
      }
    </Canvas>
  );
}

export default Experience;
