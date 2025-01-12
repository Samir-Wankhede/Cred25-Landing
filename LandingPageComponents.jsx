import React from 'react';
import { useState } from 'react';
const LandingPageComponents = ({ setExplore3D, setMountDragon, setCheckPortal, mountDragon, explore3D, checkPortal }) => {
  const handleToggleChange = (toggle) => {  
    // Set the active state based on the current toggle and set others to false
    setExplore3D(toggle === 'explore3D' ? !explore3D : false);
    setMountDragon(toggle === 'dragonMount' ? !mountDragon : false);
    setCheckPortal(toggle === 'checkPortal' ? !checkPortal : false);
  };

  const activeToggle = explore3D ? 'explore3D' : mountDragon ? 'dragonMount' : checkPortal ? 'checkPortal' : null;

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-between py-20'>
      <div className={`items-center w-screen flex flex-col h-auto transition-all duration-1000 ${activeToggle ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className='flex gap-1'>
          <p className='md:custom-shadow1 custom-shadow2 text-7xl md:text-9xl text-[#fff3d4]'> CREDENZ </p>
          <p className='md:custom-shadow1 custom-shadow2 text-7xl md:text-9xl text-[#fff3d4]'> '25 </p>
        </div>
        <p className='custom-shadow2 -mt-4 text-3xl md:text-4xl text-[#fff3d4]'> Pixelating Realms </p>
      </div>
      <div className="flex gap-5 space-x-4 mb-8 flex-grow items-end">
        <div className={`pointer-events-auto transition-all duration-1000 ${activeToggle && activeToggle !== 'explore3D' ? 'scale-150 opacity-0 invisible' : 'scale-100 opacity-100 visible'}`}>
          <div className="flex flex-col justify-center items-center space-x-2">
            <input
              type="checkbox"
              id="explore3D"
              checked={activeToggle === 'explore3D'}
              onChange={() => handleToggleChange('explore3D')}
              className="sr-only"
              disabled={activeToggle === 'dragonMount' || activeToggle === 'checkPortal'}
            />
            <label
              htmlFor="explore3D"
              className={`w-12 h-6 bg-gray-400 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-200 ease-in-out ${
                activeToggle === 'explore3D' ? 'bg-blue-600' : ''
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  activeToggle === 'explore3D' ? 'translate-x-6' : ''
                }`}
              ></span>
            </label>
            <label htmlFor="explore3D" className="cursor-pointer text-2xl text-white">Explore 3D</label>
          </div>
        </div>
        <div className={`pointer-events-auto transition-all duration-1000 ${activeToggle && activeToggle !== 'dragonMount' ? 'scale-150 opacity-0 invisible' : 'scale-100 opacity-100 visible'}`}>
          <div className="flex flex-col justify-center items-center space-x-2">
            <input
              type="checkbox"
              id="dragonMount"
              checked={activeToggle === 'dragonMount'}
              onChange={() => handleToggleChange('dragonMount')}
              className="sr-only"
              disabled={activeToggle === 'explore3D' || activeToggle === 'checkPortal'}
            />
            <label
              htmlFor="dragonMount"
              className={`w-12 h-6 bg-gray-400 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-200 ease-in-out ${
                activeToggle === 'dragonMount' ? 'bg-blue-600' : ''
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  activeToggle === 'dragonMount' ? 'translate-x-6' : ''
                }`}
              ></span>
            </label>
            <label htmlFor="dragonMount" className="cursor-pointer text-2xl text-white">Dragon Mount</label>
          </div>
        </div>
        <div className={`pointer-events-auto transition-all duration-1000 ${activeToggle && activeToggle !== 'checkPortal' ? 'scale-150 opacity-0 invisible' : 'scale-100 opacity-100 visible'}`}>
          <div className="flex flex-col justify-center items-center space-x-2">
            <input
              type="checkbox"
              id="checkPortal"
              checked={activeToggle === 'checkPortal'}
              onChange={() => handleToggleChange('checkPortal')}
              className="sr-only"
            />
            <label
              htmlFor="checkPortal"
              className={`w-12 h-6 bg-gray-400 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-200 ease-in-out ${
                activeToggle === 'checkPortal' ? 'bg-blue-600' : ''
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  activeToggle === 'checkPortal' ? 'translate-x-6' : ''
                }`}
              ></span>
            </label>
            <label htmlFor="checkPortal" className="cursor-pointer text-2xl text-white">Check Portal</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageComponents;
