import { Html } from "@react-three/drei";

const DragonLoader = ({ loaded }) => {
  if (loaded) return null;

  return (
    <Html center>
      <div
        className="text-white w-screen h-full flex justify-start items-start ml-2 -translate-y-[48vh]"
      >
        Loading Dragon...
      </div>
    </Html>
  );
};

export default DragonLoader;
