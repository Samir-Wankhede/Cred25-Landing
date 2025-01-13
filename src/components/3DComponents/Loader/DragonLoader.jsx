import { Html } from "@react-three/drei";

const DragonLoader = ({ loaded }) => {
  if (!loaded) return null;
  
  return (
    <Html className="h-[20vh] w-full absolute" center={false} prepend>
      <div className="text-white text-sm pointer-events-none pl-4 pt-4">
        Loading Dragon...
      </div>
    </Html>
  );
};

export default DragonLoader;