import { Html, useProgress } from "@react-three/drei";
import { useEffect } from "react";

const Loader = ({setLoaded}) => {
  const { progress } = useProgress();
  useEffect(() => {
    return () => {
      setLoaded(true);
    };
  }, [setLoaded]);
  return (
    <Html center>
      <div className="h-screen w-screen flex flex-col justify-center items-center relative">
        {/* Background Image */}
        <img
          src="/loading-bg.webp"
          alt="Loading Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Loader Content */}
        <div className="z-10 flex flex-col items-center md:-translate-y-0 -translate-y-[25%]">
          {/* Percentage */}
          <p className="text-6xl text-white mb-4 custom-shadow2">{Math.floor(progress)}%</p>
          {/* Loader GIF */}
          <img
            src="/loading-loader.webp"
            alt="Loader"
            className="w-[25vh] h-[25vh]" /* Adjust size if necessary */
          />
        </div>
      </div>
    </Html>
  );
};

export default Loader;
