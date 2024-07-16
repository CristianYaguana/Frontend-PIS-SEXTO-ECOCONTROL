'use client'
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

function SimpleTable() {
    const [datos, setDatos] = useState([]);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [pagina, setPagina] = useState(1);
    const [filasPagina, setFilasPagina] = useState(5);
    const [filtrarData, setFiltrarData] = useState([]);
    const tableRef = useRef();

    useEffect(() => {
        fetch('http://localhost:3007/api/admin/registro')
            .then(response => response.json())
            .then(data => setDatos(data.datos))
            .catch(error => console.error('Error fetching data', error))
    }, []);

    useEffect(() => {
        setFiltrarData(datos);
    }, [datos]);

    const descargarPDF = () => {
        const doc = new jsPDF();

        const tableColumn = ["Fecha", "Temperatura", "Humedad", "CO2"];
        const tableRows = [];

        datos.forEach(data => {
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

    const descargarExcel = () => {
        const ws = XLSX.utils.json_to_sheet(datos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Datos");
        XLSX.writeFile(wb, "tabla.xlsx");
    };

    const handleDownload = (format) => {
        if (format === "pdf") {
            descargarPDF();
        } else if (format === "excel") {
            descargarExcel();
        }
    };

    const handleBuscar = () => {
        fetch(`http://localhost:3007/api/admin/registro?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .then(response => response.json())
            .then(data => {
                setDatos(data.datos);
                setFiltrarData(data.datos);
                setPagina(1);
            })
            .catch(error => console.error('Error fetching data', error));
    };

    const handleCancelar = () => {
        fetch('http://localhost:3007/api/admin/registro')
            .then(response => response.json())
            .then(data => {
                setDatos(data.datos);
                setFiltrarData(data.datos);
                setFechaInicio("");
                setFechaFin("");
                setPagina(1);
            })
            .catch(error => console.error('Error fetching data', error));
    };

    const indexOfLastRow = pagina * filasPagina;
    const indexOfFirstRow = indexOfLastRow - filasPagina;
    const currentRows = datos.slice(indexOfFirstRow, indexOfLastRow);

    const handlePaginaCambiar = (direccion) => {
        if (direccion === "next" && pagina < Math.ceil(datos.length / filasPagina)) {
            setPagina(pagina + 1);
        } else if (direccion === "prev" && pagina > 1) {
            setPagina(pagina - 1)
        }
    };

    const handleAbrirModal = () => setAbrirModal(true);
    const handleCerrarModal = () => setAbrirModal(false);
    // grafica
    const dataForChart = {
        labels: filtrarData.map((d) => d.fecha),
        datasets: [
            {
                label: "Temperatura",
                data: filtrarData.map((d) => d.temperatura),
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
            {
                label: "Humedad",
                data: filtrarData.map((d) => d.humedad),
                borderColor: "rgba(153,102,255,1)",
                fill: false,
            },
            {
                label: "CO2",
                data: filtrarData.map((d) => d.co2),
                borderColor: "rgba(255,159,64,1)",
                fill: false,
            },
        ],
    };


    return (
        <>
            <div className="bg-white ">
                <div className="p-4 mx-auto">
                    <div className="bg-white shadow-md rounded-lg p-4 mb-4 mx-auto max-w-3xl">
                        <div className="flex items-center mb-4 text-black">
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="mr-2 border border-gray-300 p-2 rounded-md"
                            />
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className="mr-2 border border-gray-300 p-2 rounded-md"
                            />
                            <button onClick={handleBuscar} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Buscar
                            </button>
                            <button onClick={handleCancelar} className="mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Cancelar
                            </button>
                            <select
                                onChange={(e) => handleDownload(e.target.value)}
                                defaultValue=""
                                className="select-dropdown border border-gray-300 p-2 rounded-md text-black"
                            >
                                <option value="" disabled>DESCARGA</option>
                                <option value="pdf">PDF</option>
                                <option value="excel">Excel</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TEMPERATURA</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HUMEDAD</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO2</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-black">
                                    {currentRows.map((row) => (
                                        <tr key={row.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.fecha_hora}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.temperatura}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.humedad}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.co2}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex items-center">
                            <button
                                onClick={() => handlePaginaCambiar("prev")}
                                disabled={pagina === 1}
                                className={`mr-2 py-2 px-4 ${pagina === 1 ? 'bg-gray-500 text-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white hover:text-white'} rounded`}
                            >
                                Anterior
                            </button>
                            <span className="mx-2">Página {pagina}</span>
                            <button
                                onClick={() => handlePaginaCambiar("next")}
                                disabled={pagina === Math.ceil(datos.length / filasPagina)}
                                className={`py-2 px-4 ${pagina === Math.ceil(datos.length / filasPagina) ? 'bg-gray-500 text-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white hover:text-white'} rounded`}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SimpleTable;
