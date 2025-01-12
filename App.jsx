import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import { gsap } from 'gsap';
import Portal from '../public/Portal'; // Import your Portal component
import { AxesHelper } from 'three';
import './App.css'; 


function App() {
  const [explore, setExplore] = useState(false);
  const [portalZoom, setPortalZoom] = useState(false);
  const [bgColor, setBgColor] = useState('#f0e68c'); // Initial background color is yellow
  const cameraRef = useRef();
  const controlsRef = useRef();
  const initialPosition = [45, 8, -5];

  // Animate camera movement
  const animateCamera = (targetPosition, lookAtTarget, enableControls) => {
    if (!cameraRef.current) return;
    if (controlsRef.current) controlsRef.current.enabled = enableControls;

    gsap.to(cameraRef.current.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: 2,
      ease: 'power3.inOut',
      onUpdate: () => cameraRef.current.lookAt(...lookAtTarget),
    });
  };

  useEffect(() => {
    if (explore) {
      setPortalZoom(false); // Exit portal zoom when enabling explore mode
      animateCamera([4, -5, -50], [0, 0, 10], true);
    } else {
      animateCamera(initialPosition, [0, 0, 0], false);
    }
  }, [explore]);

  useEffect(() => {
    if (!portalZoom) {
      gsap.to(cameraRef.current, {
        fov: 50,
        duration: 1,
        ease: 'power3.inOut',
        onUpdate: () => cameraRef.current.updateProjectionMatrix(),
      });
    }
  }, [portalZoom]);

  // Portal zoom effect function
  const handlePortalZoomToggle = () => {
    if (explore) return; // Prevent portal zoom while exploring

    if (portalZoom) {
      // Reset to initial view if exiting portal zoom
      setPortalZoom(false);
      setBgColor('#f0e68c'); // Change back to yellow after exiting the portal

      // Animate back to initial position when exiting portal zoom
      animateCamera(initialPosition, [0, 0, 0], false);
    } else {
      if (controlsRef.current) controlsRef.current.enabled = false; // Disable controls during portal zoom

      gsap.to(cameraRef.current, {
        fov: 7,
        duration: 2.5,
        ease: 'power3.inOut',
        onUpdate: () => cameraRef.current.updateProjectionMatrix(),
      });

      gsap.to(cameraRef.current.position, {
        x: 1,
        y: 5,
        z: 5,
        duration: 3,
        onUpdate: () => {
          cameraRef.current.lookAt(-10, 8, 0); // Ensure the camera is looking at the center of the portal (adjust y as needed)
        },
        onComplete: () => {
          setPortalZoom(true); //// Zoom complete
          setBgColor('#0000ff'); // Change background color to blue after zoom is complete
        },
      });
    }
  };

  return (
    <div className="app-container">
      <button onClick={() => setExplore(!explore)} className="explore-btn">
        {explore ? 'Disable Interaction' : 'Explore 3D'}
      </button>

      <button
        onClick={handlePortalZoomToggle}
        className="portal-btn"
        disabled={explore} // Disable button if exploring
      >
        {portalZoom ? 'Exit Portal' : 'Check Portal'}
      </button>

      <Canvas
        camera={{ position: initialPosition }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
        style={{ backgroundColor: bgColor }} // Set background color dynamically
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        {explore && (
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            minDistance={15}
            maxDistance={70}
            enablePan={false}
            maxPolarAngle={Math.PI / 2.5}
            minPolarAngle={Math.PI / 5}
          />
        )}

        <Suspense fallback={<span>Loading...</span>}>
          <Portal />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
