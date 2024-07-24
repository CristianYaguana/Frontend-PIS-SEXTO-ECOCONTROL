'use client';
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import Mensajes from "@/componentes/Mensajes"; // Asegúrate de importar mensajes correctamente
import { busquedaPersonas, cambiarEstado, obtenerP } from "@/hooks/Conexion";
import { borrarSesion, getR, getToken, getE } from "@/hooks/SessionUtilClient";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Page() {
    const key = getToken();
    const rol = getR();
    const idlogin = getE();
    const router = useRouter();
    const [obt, setObt] = useState(false);
    const [personas, setPersonas] = useState([]);
    const [valorBusqueda, setValorBusqueda] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPersonas = (page, limit) => {
        obtenerP(`admin/personas?page=${page}&limit=${limit}`, key, rol).then((info) => {
            if (info.code === 200) {
                setPersonas(info.datos);
                setTotalPages(info.totalPages);
                setObt(true);
                console.log("El usuario logeado es", idlogin);
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

    const handleBuscarClick = () => {
        const selectElement = document.getElementById('filtroBusqueda');
        const selectedValue = selectElement.value;
        let dir = "";

        if (selectedValue === "nombre") {
            if (valorBusqueda.length === 0) {
                Mensajes("Ingresa algún valor de búsqueda", "Información", "error");
                return;
            } else {
                dir = `admin/personas/buscar/nombre/${valorBusqueda}?page=${page}&limit=${limit}`;
            }
        } else {
            dir = `admin/personas?page=${page}&limit=${limit}`;
        }
        busquedaPersonas(dir, key, rol).then((info) => {
            if (info.code === 200) {
                setPersonas(info.datos);
                setTotalPages(Math.ceil(info.totalCount / limit));
                Mensajes(info.tag, "Información", "success");
            } else {
                Mensajes(info.tag, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login");
            }
        });
    };

    const handleEstado = (external, dato) => {
        const datos = { 'estado': dato };
        cambiarEstado(`admin/personas/estado/${external}`, datos, key, rol).then((info) => {
            if (info.code === 200) {
                console.log("Se cambia de estado correctamente");
                setObt(false); // Indicar que los datos están desactualizados
                // Actualizar la lista de personas automáticamente después de cambiar el estado
                fetchPersonas(page, limit);
            } else {
                Mensajes(info.tag, "Error", "error");
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

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Menu />
            <div className="container my-4 flex-grow-1">
                <h1 className="text-center my-3" style={{ margin: '20px 0' }}>Lista de Usuarios</h1>
                <div className="input-group mb-3" style={{ justifyContent: 'center' }}>
                    <select className="form-control" id="filtroBusqueda" style={{ width: '150px', backgroundColor: '#F2F6F5', color: '#333', border: "1px solid #000000", marginRight: '10px' }} aria-describedby="button-addon2">
                        <option value="">Mostrar Todos los datos</option>
                        <option value="nombre">Nombre</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Ingrese dato de búsqueda" onChange={handleValorBusqueda} value={valorBusqueda} />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleBuscarClick}>Buscar</button>
                </div>

                <div className="text-center mb-4">
                    <Link href="/usuarios/registrar" className="btn btn-outline-success">
                        <span className="d-flex align-items-center">
                            <span className="me-2">Registrar</span>
                            <img src="/img/boton-guardar.png" alt="icon" style={{ width: '20px', height: '20px' }} />
                        </span>
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Nro</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Estado</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.length > 0 ? (
                                personas.map((dato, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{dato.nombres}</td>
                                        <td>{dato.apellidos}</td>
                                        <td>{dato.telefono}</td>
                                        <td>{dato.cuenta?.correo}</td>
                                        <td>{dato.cuenta?.estado === true ? 'Activo' : 'Inactivo'}</td>
                                        <td>{dato.rol.nombre}</td>
                                        <td>
                                            <Link href="/personas/modificar/[external]" as={`usuarios/modificar/${dato.external_id}`} className="btn btn-warning font-weight-bold mb-2 me-2">Modificar</Link>
                                            {dato.rol.nombre === "Administador" && (
                                                <>
                                                    {dato.cuenta.estado ? (
                                                        <button type="button" onClick={() => handleEstado(dato.id, "false")} className="btn btn-danger btn-sm font-weight-bold me-2" style={{ padding: '0.25rem 0.5rem' }}>Dar de baja</button>
                                                    ) : (
                                                        <button type="button" onClick={() => handleEstado(dato.id, "true")} className="btn btn-success btn-sm font-weight-bold me-2" style={{ padding: '0.25rem 0.5rem' }}>Activar</button>
                                                    )}

                                                </>
                                            )}

                                            {dato.rol.nombre === "Usuario Registrado" && (
                                                <>
                                                    {dato.cuenta.estado ? (
                                                        <button type="button" onClick={() => handleEstado(dato.id, "false")} className="btn btn-danger btn-sm font-weight-bold me-2" style={{ padding: '0.25rem 0.5rem' }}>Dar de baja</button>
                                                    ) : (
                                                        <button type="button" onClick={() => handleEstado(dato.id, "true")} className="btn btn-success btn-sm font-weight-bold me-2" style={{ padding: '0.25rem 0.5rem' }}>Activar</button>
                                                    )}

                                                </>
                                            )}
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
                <div className="d-flex justify-content-between">
                    <button className="btn btn-info" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                        Anterior
                    </button>
                    <span>Página {page} de {totalPages}</span>
                    <button className="btn btn-info" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                        Siguiente
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
