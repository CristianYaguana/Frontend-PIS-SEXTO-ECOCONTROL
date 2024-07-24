'use client';
import React, { useState, useEffect } from 'react';
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredData2, setFilteredData2] = useState([]);

    useEffect(() => {
        fetchFilteredData();
    }, []);

    const fetchFilteredData = async () => {
        let url = 'http://localhost:3007/api/admin/registro';

        const query = new URLSearchParams();
        if (startDate) query.append('fechaInicio', startDate.toISOString().split('T')[0]);
        if (endDate) query.append('fechaFin', endDate.toISOString().split('T')[0]);

        if (query.toString()) {
            url += `?${query.toString()}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Data received:', data);
            setFilteredData(data.datos);
            setFilteredData2(data.datos2);
        } catch (error) {
            console.error('Error fetching data:', error);
            setFilteredData([]);
        }
    };

    const DataA = async () => {
        let url = 'http://localhost:3007/api/admin/registro';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredData(data.datos);
            setFilteredData2(data.datos2);
        } catch (error) {
            console.error('Error fetching data:', error);
            setFilteredData([]);
        }
    };

    const handleFilter = () => {
        fetchFilteredData();
    };

    const handleClear = async () => {
        setStartDate(null);
        setEndDate(null);
        DataA();
    };

    const chartData = {
        labels: filteredData.map(item => item.fecha_hora),
        datasets: [
            {
                label: "Temperatura",
                data: filteredData.map((d) => d.temperatura),
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
            {
                label: "Humedad",
                data: filteredData.map((d) => d.humedad),
                borderColor: "rgba(153,102,255,1)",
                fill: false,
            },
            {
                label: "CO2",
                data: filteredData.map((d) => d.co2),
                borderColor: "rgba(255,159,64,1)",
                fill: false,
            },
        ],
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        const tableColumn = ["Fecha", "Temperatura", "Humedad", "CO2"];
        const tableRows = [];

        filteredData.forEach(data => {
            const dataRow = [
                data.fecha_hora,
                data.temperatura,
                data.humedad,
                data.co2
            ];
            tableRows.push(dataRow);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Reporte de Sensores", 14, 15);
        doc.save("reporte.pdf");
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = {
            Sheets: { data: worksheet },
            SheetNames: ["data"]
        };
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
        XLSX.writeFile(workbook, "reporte.xlsx");
    };

    // Función para determinar el color del texto según el estado
    const getColorByState = (state) => {
        switch (state) {
            case 'Normal':
                return 'text-yellow-400';
            case 'Alto':
                return 'text-red-400';
            case 'Bajo':
                return 'text-green-400';
            default:
                return 'text-red-400';
        }
    };

    return (
        <div className="bg-white">
            <div className="p-4 mx-auto">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:flex-auto h-96 bg-white rounded-3xl shadow-md p-4">
                        <Line data={chartData} options={{ maintainAspectRatio: false }} />
                    </div>
                    <div className="flex-none md:w-72 h-96 bg-white rounded-3xl shadow-md p-4 mb-8">
                        <h2 className="mb-4 text-center text-black">Filtro</h2>
                        <div className="mb-2">
                            <label className="block mb-1 text-black">Fecha Inicio:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="w-full text-black px-3 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-black">Fecha Fin:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="w-full text-black px-3 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-center p-2">
                            <button className="mr-2 px-8 py-2 bg-blue-500 text-white rounded-full cursor-pointer" onClick={handleFilter}>Aplicar</button>
                            <button className="px-8 py-2 bg-white text-gray-800 border border-gray-300 rounded-full cursor-pointer" onClick={handleClear}>Limpiar</button>
                        </div>
                    </div>
                </div>
                {/* Sección de temperatura, humedad, co2 y recomendaciones */}
                <div className="flex flex-col md:flex-row md:items-start gap-4 p-4">
                    <div className="md:flex-auto h-96">
                        <div className="grid grid-cols-3 gap-4">
                            <div className={`text-black bg-white rounded-3xl shadow-md text-center items-center p-4 ${getColorByState(filteredData2.estadoTemperatura)}`}>
                                <div className="text-7xl font-bold">
                                    {filteredData2.temperatura}
                                </div>
                                <div className="text-3xl font-bold">Temperatura °C</div>
                                <div className="text-xl">
                                    {filteredData2.estadoTemperatura}
                                </div>
                            </div>
                            <div className={`text-black bg-white rounded-3xl shadow-md text-center items-center p-4 ${getColorByState(filteredData2.estadoHumedad)}`}>
                                <div className="text-7xl font-bold">
                                    {filteredData2.humedad}
                                </div>
                                <div className="text-3xl font-bold">Humedad %</div>
                                <div className="text-xl">
                                    {filteredData2.estadoHumedad}
                                </div>
                            </div>
                            <div className={`text-black bg-white rounded-3xl shadow-md text-center items-center p-4 ${getColorByState(filteredData2.estadoCO2)}`}>
                                <div className="text-7xl font-bold">
                                    {filteredData2.co2}
                                </div>
                                <div className="text-3xl font-bold">CO2 ppm</div>
                                <div className="text-xl">
                                    {filteredData2.estadoCO2}
                                </div>
                            </div>
                            <div className='col-start-1 col-end-4 text-black bg-white rounded-3xl shadow-md p-4'>
                                <h2 className="text-xl mb-2 text-blue-950">Recomendaciones:</h2>
                                <ul className="list-disc list-inside text-left">
                                    {filteredData2.recomendaciones && filteredData2.recomendaciones.map((recommendation, index) => (
                                        <li key={index} className="text-gray-500">{recommendation}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Sección de contaminación */}
                    <div className="flex-none md:w-72 h-80 bg-white rounded-3xl shadow-md p-4 text-center">
                        <div className="grid grid-rows-4 gap-2 h-full">
                            <div className="row-span-1 text-yellow-400 text-3xl flex items-center justify-center">
                                {filteredData2.contaminationLevel}
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