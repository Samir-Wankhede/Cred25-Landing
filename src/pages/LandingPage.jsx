import Experience from "../components/3DComponents/Experience";
import LandingPageComponents from "../components/LandingPageComponents/LandingPageComponents";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [explore3D, setExplore3D] = useState(false);
  const [mountDragon, setMountDragon] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [dragonLoaded, setDragonLoaded] = useState(false);
  useEffect(()=>{
    // console.log("explore3D",explore3D,"mountDragon",mountDragon);
  },[explore3D,mountDragon])
  return (
    <div className="h-screen w-screen relative">
      <Experience
        mountDragon={mountDragon}
        setMountDragon={setMountDragon} 
        explore3D={explore3D} 
        setLoaded={setLoaded} 
        loaded={loaded} 
        setDragonLoaded={setDragonLoaded}
      />
      <div className="absolute inset-0 z-10 pointer-events-none">
        {loaded && <LandingPageComponents setExplore3D={setExplore3D} setMountDragon={setMountDragon} explore3D={explore3D} mountDragon={mountDragon} dragonLoaded={dragonLoaded} />}
      </div>
    </div>
  );
};

export default LandingPage;
