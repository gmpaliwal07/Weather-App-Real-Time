import  { useState } from 'react';
import Lottie from 'react-lottie';
import { animateScroll as scroll } from 'react-scroll';
import Cloudy from '../lotties/Cloudy.json';
import searchIcon from '/assets/search.svg';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: Cloudy,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', 
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div 
            className="flex items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => scroll.scrollToTop({ smooth: true, duration: 500 })}
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white font-mono mr-4">
              Weather App
            </h1>
            <Lottie options={defaultOptions} height={50} width={50} />
          </div>
          
          <form onSubmit={handleSearch} className="w-full md:w-1/3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 text-white rounded-full 
                  bg-gray-800/50 backdrop-blur-lg 
                  border border-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-gray-500 
                  placeholder:text-gray-400 text-lg"
              />
              <button 
                type="submit" 
                className="absolute right-2 p-2 rounded-full 
                  hover:bg-gray-700 transition-all duration-300 
                  flex items-center justify-center"
              >
                <img 
                  src={searchIcon} 
                  alt="search" 
                  className="w-6 h-6 md:w-7 md:h-7 invert opacity-70 hover:opacity-100"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;