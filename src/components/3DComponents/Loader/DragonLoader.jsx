import { Html } from "@react-three/drei";

const DragonLoader = ({ loaded }) => {
  if (loaded) return null;

  return (
    <Html
      style={{
        pointerEvents: "none", // Ensure it doesn't block clicks
      }}
      transform={false} // Avoid unnecessary transformations
    >
      <div
        className="absolute top-0 left-0 text-white text-sm pl-4 pt-4"
        style={{
          pointerEvents: "none", // This ensures the text itself doesn't block
        }}
      >
        Loading Dragon...
      </div>
    </Html>
  );
};

export default DragonLoader;
