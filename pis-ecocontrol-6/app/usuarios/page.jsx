'use client'
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import mensajes from "@/componentes/Mensajes";
import { busquedaSensores, cambiarEstado, obtenerP } from "@/hooks/Conexion";
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
                        <option value="">Selecionar</option>
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
                                    <td>{dato.cuenta.correo}</td>
                                    <td>{dato.cuenta?.estado === true ? 'Activo': 'Inactivo' }</td>
                                    <td>{dato.rol.nombre}</td>
                                    <td>
                                        <Link href="/personas/modificar/[external]" as={`usuarios/modificar/${dato.external_id}`} className="btn btn-warning font-weight-bold mb-2 me-2">Modificar</Link>
                                        {dato.rol.nombre === "Administador" && (
                                            <>
                                                {dato.cuenta.estado ? (
                                                   <button type="button" onClick={() => handleEstado(dato.id, "false")} className="btn btn-danger font-weight-bold mb-2 me-2">Dar de baja</button>

                                                ) : (
                                                    
                                                    <button type="button" onClick={() => handleEstado(dato.id, "true")} className="btn btn-success font-weight-bold mb-2 me-2">Activar</button>
                                                    
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
            <br />
            <Footer />

        </div>
    );
}







