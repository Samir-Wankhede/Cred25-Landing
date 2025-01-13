import { Html, useProgress } from "@react-three/drei";

const DragonLoader = ({loaded}) => {
  const { progress } = useProgress();
  return ( loaded &&
    <Html>
        <p className="text-sm text-white absolute z-10 top-1 left-1"> Loading Dragon {Math.floor(progress)}%</p>
    </Html>
  );
};

export default DragonLoader;
