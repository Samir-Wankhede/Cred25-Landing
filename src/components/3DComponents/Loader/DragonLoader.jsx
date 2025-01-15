import { Html } from "@react-three/drei";
import { useEffect } from "react";

const DragonLoader = ({ loaded, setDragonLoaded }) => {
  if (!loaded) return null;

  useEffect(() => {
    return () => {
      setDragonLoaded(true);
    };
  }, [setDragonLoaded]);

  return (
    <Html center>
      <div
        className="text-white w-screen h-full flex justify-start items-start ml-2 -translate-y-[48vh]"
      >
        Unleashing the beast...
      </div>
    </Html>
  );
};

export default DragonLoader;
