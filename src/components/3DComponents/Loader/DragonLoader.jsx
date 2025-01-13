const DragonLoader = ({ loaded }) => {
    if (!loaded) return null;
    
    return (
      <div className="fixed top-4 left-4 text-white text-sm pointer-events-none z-50">
        Loading Dragon...
      </div>
    );
  };
  
  export default DragonLoader;