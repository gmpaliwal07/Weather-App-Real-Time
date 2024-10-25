import Lottie from 'react-lottie';
import { animateScroll as scroll } from 'react-scroll';
import Cloudy from '../lotties/Cloudy.json';
import { useState } from 'react';
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
      onSearch(searchTerm); // Trigger the parent component’s onSearch function
      setSearchTerm(''); // Clear the input after search
    }
  };

  return (
    <div className=' z-10 text-center md:justify-center p-4 bg-primary fixed md:w-full'>
      <div className="flex flex-col md:flex-row p-3 justify-between drop-shadow-xl items-center border rounded-lg">
        <div className="flex items-center pl-2 cursor-pointer" onClick={() => scroll.scrollToTop({ smooth: true, duration: 500 })}>
          <h1 className="md:text-4xl text-xl font-bold text-text font-mono mr-4 mt-2">
            Weather
          </h1>
          <Lottie options={defaultOptions} height={50} width={50} />
        </div>
        <form onSubmit={handleSearch} className="flex items-center w-full md:w-1/3 mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border md:w-full  text-text rounded-full text-lg font-sans backdrop-blur-md bg-white/30 placeholder:text-text border-white/20 font-bold mr-2 placeholder:font-bold placeholder:font-sans placeholder:text-lg focus:outline-none"
          />
          <button 
            type="submit" 
            className="p-2 text-text rounded-lg transition duration-300 ease-in-out transform hover:scale-110"
          >
            <img src={searchIcon} alt="search" className="md:w-8 md:h-8 w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
