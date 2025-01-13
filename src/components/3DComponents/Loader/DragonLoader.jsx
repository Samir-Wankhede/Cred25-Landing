import { Html, useProgress } from "@react-three/drei";

const DragonLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="h-screen w-screen flex flex-col justify-center items-center relative">
        <p className="text-lg text-white"> Loading Dragon {progress}%</p>
      </div>
    </Html>
  );
};

export default DragonLoader;
