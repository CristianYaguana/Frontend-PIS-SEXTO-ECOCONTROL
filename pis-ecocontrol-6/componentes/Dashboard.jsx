'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const sampleData = [
  { date: '2024-07-01', name: 'Sample 1', value: 20 },
  { date: '2024-07-02', name: 'Sample 2', value: 30 },
  // Add more data as needed
];

const Dashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(sampleData);

  const handleFilter = () => {
    const filtered = sampleData.filter(item => {
      const date = new Date(item.date);
      return (!startDate || date >= startDate) && (!endDate || date <= endDate);
    });
    setFilteredData(filtered);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredData(sampleData);
  };

  const chartData = {
    labels: filteredData.map(item => item.date),
    datasets: [
      {
        label: 'Sample Data',
        data: filteredData.map(item => item.value),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const contaminationLevel = 58;

  return (
    <div className="bg-white">
      <div className="p-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Sección del gráfico */}
          <div className="md:flex-auto h-96 bg-white rounded-3xl shadow-md p-4">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
          {/* Sección de búsqueda */}
          <div className="flex-none md:w-72 h-96 bg-white rounded-3xl shadow-md p-4 mb-8">
            <h2 className="mb-4 text-center text-black">Filtro</h2>
            <div className="mb-2">
              <label className="block mb-1 text-black">Fecha Inicio:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-black">Fecha Fin:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-center p-8">
              <button className="mr-2 px-8 py-2 bg-blue-500 text-white rounded-full cursor-pointer" onClick={handleFilter}>Aplicar</button>
              <button className="px-8 py-2 bg-white text-gray-800 border border-gray-300 rounded-full cursor-pointer" onClick={handleClear}>Limpiar</button>
            </div>
          </div>
        </div>

        {/* Sección de temperatura, humedad, co2 y recomendaciones */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 p-4">
          <div className="md:flex-auto h-96">
            <div className="grid grid-cols-3 gap-4">
              <div className='text-black bg-white rounded-3xl shadow-md text-center items-center p-4' >
                <div className="text-7xl font-bold text-green-400">20</div>
                <div className="text-3xl font-bold text-green-400">Temperatura °C</div>
                <div className="text-xl text-green-400">Normal</div>
              </div>
              <div className='text-black bg-white rounded-3xl shadow-md text-center items-center p-4' >
                <div className="text-7xl font-bold text-red-400">55</div>
                <div className="text-3xl font-bold text-red-400">Humedad %</div>
                <div className="text-xl text-red-400">Alto</div>
              </div>
              <div className='text-black bg-white rounded-3xl shadow-md text-center items-center p-4'>
                <div className="text-7xl font-bold text-yellow-400">523</div>
                <div className="text-3xl font-bold text-yellow-400">CO2 ppm</div>
                <div className="text-xl text-yellow-400">Bajo</div>
              </div>
              <div className='col-start-1 col-end-4 text-black bg-white rounded-3xl shadow-md p-4'>
                <h2 className="text-xl mb-2 text-blue-950">Recomendaciones:</h2>
                <ul className="list-disc list-inside text-left">
                  <li className='text-gray-500'>Se recomienda llevar ropa abrigada</li>
                  <li className='text-gray-500'>Se recomienda llevar una botella de agua</li>
                  <li className='text-gray-500'>Se recomienda abrir las botellas</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Sección de contaminación */}
          <div className="flex-none md:w-72 h-80 bg-white rounded-3xl shadow-md p-4 text-center">
            <div className="grid grid-rows-4 gap-2 h-full">
              <div className="items-center justify-center">
                <CircularProgressbar
                  value={contaminationLevel}
                  strokeWidth={11}
                  styles={buildStyles({
                    pathColor: '#ffe461',
                    trailColor: '#fdf1c4',
                  })}
                />
              </div>
              <div className="row-span-1 text-yellow-400 text-7xl flex items-center justify-center">
                {contaminationLevel}
              </div>
              <div className="row-span-1 text-yellow-400 text-2xl flex items-center justify-center">
                Preocupación
              </div>
              <div className="row-span-1 text-yellow-400 text-2xl flex items-center justify-center">
                
              </div>
              <div className="space-y-16 row-span-1 text-2xl font-bold text-yellow-400 flex items-center justify-center">
                Contaminación
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
