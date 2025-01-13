import { Html, useProgress } from "@react-three/drei";

const DragonLoader = ({loaded}) => {
  const { progress } = useProgress();
  return ( loaded &&

    <p className="text-sm text-white absolute top-1 left-1"> Loading Dragon {Math.floor(progress)}%</p>

  );
};

export default DragonLoader;
