'use client';
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import { post, url_api } from "../hooks/Conexion";
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
import 'react-circular-progressbar/dist/styles.css';
import 'jspdf-autotable';

import { AIRE_SALUDABLE, NIVEL_ACEPTABLE, LIMITE_AIRE_FRESCO, INACEPTABLE, MALA_CONDICION, MUY_MALA_CONDICION, BAJO, NORMAL, ALTO } from "../hooks/Constants";

import ChatIcon from '@mui/icons-material/Chat'; // Importa un ícono de chat
import CloseIcon from '@mui/icons-material/Close'; // Importa un ícono de cerrar
import SendIcon from '@mui/icons-material/Send'; // Importa un ícono de cerrar
import { TextField, Button, IconButton } from '@mui/material';


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
    const [chatVisible, setChatVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchFilteredData();

        // Empezar siempre cono el mensaje del chat
        setCurrentMessage('');
        const chatbotResponse = { sender: 'bot', text: '¡Hola!, ¿En que puedo ayudarte? Puedes escribir \'ayuda\' para ver lo que puedo hacer' };
        setMessages([chatbotResponse]);

        setCurrentMessage('');
    }, []);

    useEffect(() => {
        // Bajar scroll
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchFilteredData = async () => {

        let url = `${url_api()}admin/registro`;

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

        let url = `${url_api()}admin/registro`;
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

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 100, // Incremento
                    min: 0, // Valor mínimo
                    max: 10000, // Valor máximo
                },
            },
        },
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



    // Función para determinar el color del texto según el estado
    const getColorByState = (state) => {
        switch (state) {
            case LIMITE_AIRE_FRESCO:
            case INACEPTABLE:
            case NORMAL:
                return 'text-yellow-400';
            case MALA_CONDICION:
            case MUY_MALA_CONDICION:
            case ALTO:
                return 'text-red-400';
            case NIVEL_ACEPTABLE:
            case AIRE_SALUDABLE:
            case BAJO:
                return 'text-green-400';
            default:
                return 'text-red-400';
        }
    };


    // Función para agregar mensaje y respuesta
    const sendMessage = async () => {
        if (currentMessage.trim() === '') return;

        // Guardar mensaje del usuario
        const newMessage = { sender: 'user', text: currentMessage };
        setMessages([...messages, newMessage]);

        // Respuesta del Chatbot
        let apiChatbot = 'chatbot';

        try {
            const response = await post(apiChatbot, { cadena: `${newMessage.text}` });
            console.log({ response });
            if (response.code !== 200 || response.msg != "OK") {
                throw new Error('Hubo un error al enviar el mensaje al chatbot');
            }
            const data = response.data;
            console.log('Data received CHATBOT:', data);

            const chatbotResponse = { sender: 'bot', text: data.msg };
            setMessages(prevMessages => [...prevMessages, chatbotResponse]);
            setCurrentMessage('');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Función para manejar la visibilidad del chat
    const toggleChatVisibility = () => {
        setChatVisible(!chatVisible);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar el comportamiento por defecto de Enter
            sendMessage();
        }
    };

    return (
        <div className="bg-white">
            <div className="p-4 mx-auto">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:flex-auto h-96 bg-white rounded-3xl shadow-md p-4">
                        {/* <Line data={chartData} options={{ maintainAspectRatio: false }} /> */}
                        <Line data={chartData} options={chartOptions} />
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

                <h1 className="text-3xl font-bold text-center mb-4 text-gray-300" style={{ margin: 0, marginTop: '1rem' }}>Ultimos datos recolectados </h1>
                <div className="flex flex-col md:flex-row md:items-start gap-4 p-4">
                    <div className="md:flex-auto h-96">
                        <div className="grid grid-cols-3 gap-4">
                            <div className={`bg-white rounded-3xl shadow-md text-center items-center p-4 ${getColorByState(filteredData2.estadoTemperatura)}`}>
                                <div className="text-7xl font-bold">
                                    {filteredData2.temperatura}
                                </div>
                                <div className="text-3xl font-bold">Temperatura °C</div>
                                <div className="text-xl">
                                    {filteredData2.estadoTemperatura}
                                </div>
                            </div>
                            <div className={`bg-white rounded-3xl shadow-md text-center items-center p-4 ${getColorByState(filteredData2.estadoHumedad)}`}>
                                <div className="text-7xl font-bold">
                                    {filteredData2.humedad}
                                </div>
                                <div className="text-3xl font-bold">Humedad %</div>
                                <div className="text-xl">
                                    {filteredData2.estadoHumedad}
                                </div>
                            </div>
                            <div className={`bg-white rounded-3xl shadow-md text-center items-center p-4 ${getColorByState(filteredData2.estadoCO2)}`}>
                                <div className="text-7xl font-bold">
                                    {filteredData2.co2}
                                </div>
                                <div className="text-3xl font-bold">CO2 ppm</div>
                                <div className="text-xl">
                                    {filteredData2.estadoCO2}
                                </div>
                            </div>
                            <div className='col-start-1 col-end-4 bg-white rounded-3xl shadow-md p-4'>
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
                    <div className="flex-none md:w-72 h-50 bg-white rounded-3xl shadow-md p-4 text-center">
                        <div className="grid grid-rows-4 gap-2 ">
                            <div className={`row-span-1 flex items-center justify-center text-3xl ${getColorByState(filteredData2.contaminationLevel)}`}>
                                {filteredData2.contaminationLevel}
                            </div>
                            <div className={`row-span-1 flex items-center justify-center text-2xl font-bold ${getColorByState(filteredData2.contaminationLevel)}`}>
                                Nivel de contaminación
                            </div>
                        </div>
                    </div>

                </div>

                {/* Botón de chat flotante */}
                <IconButton
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        padding: '1.1rem',
                        backgroundColor: '#3782bf',
                        color: 'white'
                    }}
                    onClick={toggleChatVisibility}
                >
                    {chatVisible && (<CloseIcon />)}
                    {!chatVisible && (<ChatIcon />)}
                </IconButton>

                {/* Cuadro de chat */}
                {chatVisible && (
                    <div
                        style={{
                            position: 'fixed',
                            bottom: '80px',
                            marginBottom: 'rem',
                            right: '20px',
                            width: '350px',
                            height: '425px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            zIndex: 1000
                        }}
                    >
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: message.sender === 'user' ? '#f1f1f1' : '#3782bf',
                                        color: message.sender === 'user' ? '#565656' : 'white',
                                        margin: '5px',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    {message.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                variant="outlined"
                                placeholder="Escribe un mensaje..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                style={{ flex: 1 }}
                            />

                            <Button onClick={sendMessage} style={{ marginLeft: '5px' }}><SendIcon /></Button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Dashboard;