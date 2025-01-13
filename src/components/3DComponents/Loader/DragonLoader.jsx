import { Html } from "@react-three/drei";

const DragonLoader = ({ loaded }) => {
  if (!loaded) return null;
  
  return (
    <Html position={[0, 0, 0]} style={{ height: '20vh', top: 0, width: '100%' }} prepend>
      <div className="text-white text-sm pointer-events-none pl-4 pt-4">
        Loading Dragon...
      </div>
    </Html>
  );
};

export default DragonLoader;