import React, { useEffect } from 'react';

const LandingPageComponents = ({ setExplore3D, setMountDragon, mountDragon, explore3D, dragonLoaded }) => {
  const handleToggleChange = (toggle) => {
    if (toggle === 'explore3D') {
      setExplore3D(activeToggle !== toggle);
    } else if (toggle === 'dragonMount') {
      setMountDragon(activeToggle !== toggle);
    }
  };

  const activeToggle =
    explore3D || mountDragon ? (explore3D ? 'explore3D' : mountDragon ? 'dragonMount' : null) : null;

  // Synchronize internal state with parent state
  useEffect(() => {
    if (!explore3D && activeToggle === 'explore3D') {
      setExplore3D(false);
    }
    if (!mountDragon && activeToggle === 'dragonMount') {
      setMountDragon(false);
    }
  }, [explore3D, mountDragon, setExplore3D, setMountDragon, activeToggle]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between py-20">
      <div
        className={`items-center w-screen flex flex-col h-auto transition-all duration-1000 ${
          activeToggle ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="flex gap-1">
          <p className="md:custom-shadow1 custom-shadow2 text-7xl md:text-9xl text-[#fff3d4]">
            CREDENZ
          </p>
          <p className="md:custom-shadow1 custom-shadow2 text-7xl md:text-9xl text-[#fff3d4]">
            '25
          </p>
        </div>
        <p className="custom-shadow2 -mt-4 text-3xl md:text-5xl text-[#fff3d4]">
          Coming Soon
        </p>
      </div>
      <div className="flex gap-5 space-x-4 mb-8 flex-grow items-end">
        <div
          className={`pointer-events-auto transition-all duration-1000 ${
            activeToggle && activeToggle !== 'explore3D'
              ? 'scale-150 opacity-0 invisible'
              : 'scale-100 opacity-100 visible'
          }`}
        >
          <div className="flex flex-col justify-center items-center space-x-2">
            <input
              type="checkbox"
              id="explore3D"
              checked={activeToggle === 'explore3D'}
              onChange={() => handleToggleChange('explore3D')}
              className="sr-only"
              disabled={activeToggle === 'dragonMount'}
            />
            <label
              htmlFor="explore3D"
              className={`w-12 h-6 bg-gray-400/40 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-200 ease-in-out ${
                activeToggle === 'explore3D' ? 'bg-blue-600' : ''
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  activeToggle === 'explore3D' ? 'translate-x-6' : ''
                }`}
              ></span>
            </label>
            <label htmlFor="explore3D" className="cursor-pointer text-2xl text-white">
              Explore
            </label>
          </div>
        </div>
        <div
          className={`pointer-events-auto transition-all duration-1000 ${
            activeToggle && activeToggle !== 'dragonMount'
              ? 'scale-150 opacity-0 invisible'
              : 'scale-100 opacity-100 visible'
          }`}
        >
          <div className="flex flex-col justify-center items-center space-x-2">
            <input
              type="checkbox"
              id="dragonMount"
              checked={activeToggle === 'dragonMount'}
              onChange={() => handleToggleChange('dragonMount')}
              className="sr-only"
              disabled={activeToggle === 'explore3D' || !dragonLoaded}
            />
            <label
              htmlFor="dragonMount"
              className={`w-12 h-6 bg-gray-400/40 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-200 ease-in-out ${
                activeToggle === 'dragonMount' ? 'bg-blue-600' : ''
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  activeToggle === 'dragonMount' ? 'translate-x-6' : ''
                }`}
              ></span>
            </label>
            <label htmlFor="dragonMount" className="cursor-pointer text-2xl text-white">
              {dragonLoaded ? "Ascend" : "wait..."}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageComponents;
