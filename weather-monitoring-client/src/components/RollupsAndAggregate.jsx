import  { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Lottie from 'react-lottie';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import loadingAnimation from '../lotties/loading.json';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const getGradientBackground = () => {
    return 'from-gray-600 via-gray-700 to-gray-800';
};

const RollupAggregateDisplay = ({ city }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/summary?city=${city}`);
        setData(response.data.summary);
      } catch (error) {
        setError("Failed to fetch summary data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, [city]);

  // Display loader
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800">
        <Lottie 
          options={{
            loop: true,
            autoplay: true,
            animationData: loadingAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={300}
          width={300}
        />
      </div>
    );
  }

  // Display error message
  if (error) return (
    <div className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 min-h-screen flex items-center justify-center">
      <div className="text-red-400 text-2xl p-8 bg-white/20 backdrop-blur-lg rounded-3xl">
        {error}
      </div>
    </div>
  );

  // Prepare chart data
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Avg Temp (°C)',
        data: data.map(entry => entry.temp.avg - 273.15),
        backgroundColor: 'rgba(196, 221, 255, 0.6)',
        borderColor: '#C4DDFF',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Max Temp (°C)',
        data: data.map(entry => entry.temp.max - 273.15),
        backgroundColor: 'rgba(255, 176, 176, 0.6)',
        borderColor: '#FFB0B0',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Min Temp (°C)',
        data: data.map(entry => entry.temp.min - 273.15),
        backgroundColor: 'rgba(255, 115, 0, 0.6)',
        borderColor: '#ff7300',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFF',
          font: { size: 16, weight: 'bold' },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        titleColor: '#FFF',
        bodyColor: '#FFF',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFF',
          font: { size: 14, weight: 'bold' },
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      y: {
        ticks: {
          color: '#FFF',
          font: { size: 14, weight: 'bold' },
          callback: (value) => `${value.toFixed(1)}°C`,
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
    },
  };

  return (
    <div className={`bg-gradient-to-br ${getGradientBackground()} text-white min-h-screen`}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden p-8">
          <h2 className="text-4xl font-bold mb-8 text-center">Weather Summary for {city}</h2>

          {/* Table Display */}
          <div className="overflow-x-auto w-full border border-white/20 rounded-lg mb-12">
            <table className="min-w-full">
              <thead>
                <tr className="bg-white/10">
                  <th className="py-3 px-4 border-b border-white/20 text-lg font-bold text-center">Date</th>
                  <th className="py-3 px-4 border-b border-white/20 text-lg font-bold text-center">Avg Temp (°C)</th>
                  <th className="py-3 px-4 border-b border-white/20 text-lg font-bold text-center">Max Temp (°C)</th>
                  <th className="py-3 px-4 border-b border-white/20 text-lg font-bold text-center">Min Temp (°C)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index} className="hover:bg-white/10 transition-colors duration-200">
                    <td className="py-3 px-4 border-b border-white/10 text-center">{entry.date}</td>
                    <td className="py-3 px-4 border-b border-white/10 text-center">{(entry.temp.avg - 273.15).toFixed(2)}</td>
                    <td className="py-3 px-4 border-b border-white/10 text-center">{(entry.temp.max - 273.15).toFixed(2)}</td>
                    <td className="py-3 px-4 border-b border-white/10 text-center">{(entry.temp.min - 273.15).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Line Chart Display */}
          <div className="w-full mx-auto" style={{maxWidth: '800px'}}>
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollupAggregateDisplay;