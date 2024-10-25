
import sunriseImage from '/assets/sunrise.svg'; // Update with your sunrise image path
import sunsetImage from '/assets/sunset.svg'; // Update with your sunset image path

const SunCycle = () => {
  return (
    <div className="flex flex-row w-full items-center space-x-4 py-8  backdrop-blur-3xl justify-center p-10">
      <div className="relative w-72 h-24">
        {/* Semicircle */}
        <div className="absolute inset-0 border rounded-b-full"></div>
        <div className="absolute inset-0 border-b-4 border bg-secondary rounded-b-full"></div>
        
        {/* Sunrise Image */}
        <div className="absolute left-0 -top-10 w-20  flex items-center justify-center">
          <img
            src={sunriseImage}
            alt="Sunrise"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Sunset Image */}
        <div className="absolute right-0 -top-10 w-16 h-16 flex items-center justify-center">
          <img
            src={sunsetImage}
            alt="Sunset"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
      
   
    </div>
  );
};

export default SunCycle;
