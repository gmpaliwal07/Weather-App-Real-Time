import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Lottie from 'react-lottie';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import loadingAnimation from '../lotties/loading.json';
// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <Lottie options={loadingAnimation}/>
    </div>
  );

  // Display error message
  if (error) return <div className="text-red-500 text-2xl p-8">{error}</div>;

  // Prepare chart data
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Avg Temp (°C)',
        data: data.map(entry => entry.temp.avg - 273.15),
        backgroundColor: 'rgba(196, 221, 255, 0.6)',
        borderColor: '#C4DDFF',
        borderWidth: 1,
      },
      {
        label: 'Max Temp (°C)',
        data: data.map(entry => entry.temp.max - 273.15),
        backgroundColor: 'rgba(255, 176, 176, 0.6)',
        borderColor: '#FFB0B0',
        borderWidth: 1,
      },
      {
        label: 'Min Temp (°C)',
        data: data.map(entry => entry.temp.min - 273.15),
        backgroundColor: 'rgba(255, 115, 0, 0.6)',
        borderColor: '#ff7300',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFF8F3',
          font: { size: 16, weight: 'bold' },
        },
      },
      tooltip: {
        backgroundColor: '#535C91',
        titleColor: '#FFF8F3',
        bodyColor: '#FFF8F3',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFF8F3',
          font: { size: 14, weight: 'bold' },
        },
      },
      y: {
        ticks: {
          color: '#FFF8F3',
          font: { size: 14, weight: 'bold' },
          callback: (value) => `${value.toFixed(1)}°C`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col p-8 bg-primary text-text gap-y-8">
      <h2 className="text-4xl font-bold mb-4">Weather Summary for {city}</h2>

      {/* Table Display */}
      <div className="overflow-x-auto w-full border border-gray-300 rounded-lg">
        <table className="min-w-full bg-primary border">
          <thead>
            <tr className="bg-primary text-text">
              <th className="py-2 px-4 border text-lg font-bold">Date</th>
              <th className="py-2 px-4 border text-lg font-bold">Avg Temp (°C)</th>
              <th className="py-2 px-4 border text-lg font-bold">Max Temp (°C)</th>
              <th className="py-2 px-4 border text-lg font-bold">Min Temp (°C)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border text-lg font-bold">{entry.date}</td>
                <td className="py-2 px-4 border text-lg font-bold">{(entry.temp.avg - 273.15).toFixed(2)}</td>
                <td className="py-2 px-4 border text-lg font-bold">{(entry.temp.max - 273.15).toFixed(2)}</td>
                <td className="py-2 px-4 border text-lg font-bold">{(entry.temp.min - 273.15).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart Display */}
      <div className="w-full md:w-3/4 lg:w-1/2">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RollupAggregateDisplay;
