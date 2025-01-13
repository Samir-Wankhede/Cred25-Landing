import { Html } from "@react-three/drei";

const DragonLoader = ({ loaded }) => {
  return (
    loaded && (
      <Html fullscreen>
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <p className="text-sm text-white absolute z-20 top-1 left-1 pointer-events-auto">
            Loading Dragon...
          </p>
        </div>
      </Html>
    )
  );
};

export default DragonLoader;
