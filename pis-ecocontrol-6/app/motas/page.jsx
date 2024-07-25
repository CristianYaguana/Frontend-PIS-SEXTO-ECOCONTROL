'use client';
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import Mensajes from "@/componentes/Mensajes"; // Asegúrate de importar mensajes correctamente
import { busquedaPersonas, cambiarEstado, obtenerM } from "@/hooks/Conexion";
import { borrarSesion, getR, getToken, getId } from "@/hooks/SessionUtilClient";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Page() {
    const key = getToken();
    const rol = getR();
    const personalog = getId();
    const router = useRouter();
    const [obt, setObt] = useState(false);
    const [personas, setPersonas] = useState([]);
    const [valorBusqueda, setValorBusqueda] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPersonas = (page, limit) => {
        obtenerM(`admin/mota?page=${page}&limit=${limit}`, key, rol).then((info) => {
            if (info.code === 200) {
                setPersonas(info.datos);
                setTotalPages(info.totalPages);
                setObt(true);
                console.log("la data de la mota es", info.datos);
                console.log("la persona logeada es ", personalog);
            } else {
                Mensajes(info.tag, "Error", "error"); // Utiliza Mensajes para mostrar el error
                Cookies.remove("token");
                borrarSesion();
                if (info.tag.includes("token")) {
                    router.push("/login");
                } else if (info.tag === "Acceso no autorizado") {
                    router.push("/principal");
                }
            }
        });
    };

    useEffect(() => {
        fetchPersonas(page, limit);
    }, [page, limit]);

    const handleValorBusqueda = (event) => {
        setValorBusqueda(event.target.value);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'white' }}>
            <Menu />
            <div className="container my-4 flex-grow-1">
                <h1 className="text-center my-3" style={{ margin: '20px 0' }}>Lista de Motas Registradas</h1>

                <div className="text-center mb-4">
                    <Link href="/motas/registrar" className="btn btn-outline-success">
                        <span className="d-flex align-items-center">
                            <span className="me-2">Registrar Mota</span>
                            <img src="/img/boton-guardar.png" alt="icon" style={{ width: '20px', height: '20px' }} />
                        </span>
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Nro</th>
                                <th>Ip</th>
                                <th>Descripcion</th>
                                <th>Estado</th>
                                <th>Sensores</th>
                                <th>Nombres y Apellidos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.length > 0 ? (
                                personas.map((dato, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{dato.ip}</td>
                                        <td>{dato.descripcion}</td>
                                        <td>{dato.estado ? 'Activo' : 'Inactivo'}</td>
                                        <td>
                                            {dato.sensores.map((sensor, i) => (
                                                <div key={i}>{sensor.tipo}</div>
                                            ))}
                                        </td>
                                        <td>{dato.persona ? `${dato.persona.nombres} ${dato.persona.apellidos}` : 'N/A'}</td>
                                        <td>
                                            <Link href={`/motas/modificar/${dato.id}`} className="btn btn-warning font-weight-bold mb-2 me-2">Modificar</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No se dispone de información</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
            <Footer />
        </div>
    );
}
