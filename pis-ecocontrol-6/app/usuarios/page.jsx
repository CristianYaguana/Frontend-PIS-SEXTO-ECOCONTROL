'use client'
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import mensajes from "@/componentes/Mensajes";
import { busquedaPersonas, cambiarEstado, obtenerP } from "@/hooks/Conexion";
import { borrarSesion, getR, getToken } from "@/hooks/SessionUtilClient";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Page() {
    const key = getToken();
    const rol = getR();
    const router = useRouter();
    const [obt, setObt] = useState(false);
    const [personas, setPersonas] = useState([]);
    const [valorBusqueda, setValorBusqueda] = useState('');

    const handleValorBusqueda = (event) => {
        setValorBusqueda(event.target.value);
    };

    if (!obt) {
        obtenerP('admin/personas', key, rol).then((info) => {
            if (info.code === 200) {
                console.log(info.datos);
                setPersonas(info.datos);
                setObt(true);
            } else {
                const errorMsg = info.tag;
                mensajes(errorMsg, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                if (errorMsg.includes("token")) {
                    router.push("/login");
                } else if (errorMsg === "Acceso no autorizado") {
                    router.push("/principal");
                }
            }
        });
        console.log("esto es personas:", setPersonas);
    }
    

    //Metodo para busqueda y listado de datos
    const handleBuscarClick = () => {

        const selectElement = document.getElementById('filtroBusqueda');
        const selectedValue = selectElement.value;
        let dir = "";

        if (selectedValue === "nombre") {
            if (valorBusqueda.length === 0) {
                mensajes("ingresa algun valor de busqueda", "Informacion", "error");
                return;
            } else {
                dir = "admin/personas/buscar/nombre/" + valorBusqueda;
            }

        } else {
            dir = "admin/personas";
        }
        busquedaPersonas(dir, key, rol).then((info) => {
            if (info.code === 200) {
                setPersonas(info.datos);
            } else if (info.code !== 200 && (info.tag === "token expirado o no valido" || info.tag === "token no valido" || info.tag === "no existe token")) {
                mensajes(info.tag, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login")
            } else if (info.code !== 200 && info.tag === "Acceso no autorizado") {
                router.push("/principal")
                mensajes(info.tag, "Informacion", "error");
            } else {
                mensajes("No se pudo listar los datos", "Error", "error");
            }
        });

    }




    const handleEstado = (external, dato) => {
        const datos = { 'estado': dato };
        console.log(external)
        cambiarEstado('admin/personas/estado/' + external, datos, key, rol).then((info) => {
            if (info.code === 200) {
                mensajes(info.tag, "Informacion", "success");
                setObt(false);
            } else {
                const errorMsg = info.tag;
                mensajes(errorMsg, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                if (errorMsg.includes("token")) {
                    router.push("/login");
                } else if (errorMsg === "Acceso no autorizado") {
                    router.push("/principal");
                }
            }
        });
    };

    return (
        <div className="container">
            <Menu />
            <h1 className="text-center mt-4">Lista de Usuarios</h1>
            <br />
            <div className="container-fluid">
                <div className="input-group mb-3" style={{ justifyContent: 'center' }}>
                    <select className="form-control" id="filtroBusqueda" style={{ width: '50px', backgroundColor: '#F2F6F5', color: '#333', border: "1px solid #000000", marginRight: '10px' }} aria-describedby="button-addon2">
                        <option value="">Lista</option>
                        <option value="nombre">Nombre</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Ingrese dato de búsqueda" onChange={handleValorBusqueda} value={valorBusqueda} />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleBuscarClick}>Buscar</button>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 mb-4 text-center">
                            <div className="btn-group" role="group">
                                <Link href="/usuarios/registrar" className="btn btn-outline-success">
                                    <span className="d-flex align-items-center">
                                        <span className="me-2">Registrar</span>
                                        <img src="/img/boton-guardar.png" alt="icon" style={{ width: '20px', height: '20px' }} />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-striped text-center" style={{ borderColor: 'black' }}>
                    <thead className="table-dark">
                        <tr>
                            <th style={{ border: '1px solid black' }}>Nro</th>
                            <th style={{ border: '1px solid black' }}>Nombres</th>
                            <th style={{ border: '1px solid black' }}>Apellidos</th>
                            <th style={{ border: '1px solid black' }}>Teléfono</th>
                            <th style={{ border: '1px solid black' }}>Correo</th>
                            <th style={{ border: '1px solid black' }}>Estado</th>
                            <th style={{ border: '1px solid black' }}>Rol</th>
                            <th style={{ border: '1px solid black', width: '250px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.length > 0 ? (
                            personas.map((dato, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                    <td style={{ border: '1px solid black' }}>{dato.nombres}</td>
                                    <td style={{ border: '1px solid black' }}>{dato.apellidos}</td>
                                    <td style={{ border: '1px solid black' }}>{dato.telefono}</td>
                                    <td style={{ border: '1px solid black' }}>{dato.cuenta.correo}</td>
                                    <td style={{ border: '1px solid black' }}>{dato.cuenta?.estado === true ? 'Activo': 'Inactivo' }</td>
                                    <td style={{ border: '1px solid black' }}>{dato.rol.nombre}</td>
                                    <td style={{ border: '1px solid black' }}>
                                        <div className="d-flex justify-content-center">
                                            <Link href="/personas/modificar/[external]" as={`usuarios/modificar/${dato.external_id}`} className="btn btn-warning btn-sm font-weight-bold me-2" style={{ padding: '0.25rem 0.5rem' }}>Modificar</Link>
                                            {dato.rol.nombre === "Administador" && (
                                                <>
                                                    {dato.cuenta.estado ? (
                                                       <button type="button" onClick={() => handleEstado(dato.id, "false")} className="btn btn-danger btn-sm font-weight-bold me-2" style={{ padding: '0.25rem 0.5rem' }}>Dar de baja</button>
                                                    ) : (
                                                        <button type="button" onClick={() => handleEstado(dato.id, "true")} className="btn btn-success btn-sm font-weight-bold me-2" style={{ padding: '0.25rem 0.5rem' }}>Activar</button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ border: '1px solid black' }}>No se dispone de información</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <br />
            <Footer />
        </div>
    );
}







