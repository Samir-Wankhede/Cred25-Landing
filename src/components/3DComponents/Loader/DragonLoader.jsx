import { Html, useProgress } from "@react-three/drei";

const DragonLoader = ({loaded}) => {
  const { progress } = useProgress();
  return ( loaded &&
    <Html center>
      <div className="h-screen w-screen flex flex-col justify-start items-start relative">
        <p className="text-sm custom-shadow2 text-white"> Loading Dragon {Math.floor(progress)}%</p>
      </div>
    </Html>
  );
};

export default DragonLoader;
