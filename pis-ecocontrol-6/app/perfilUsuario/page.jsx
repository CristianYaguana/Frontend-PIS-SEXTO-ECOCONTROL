'use client';
import mensajes from "@/componentes/Mensajes";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { guardar, obtenerP, obtenerR } from "@/hooks/Conexion";
import { useEffect, useState } from "react";
import { borrarSesion, getR, getToken, getE } from "@/hooks/SessionUtilClient";
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import Cookies from "js-cookie";

const salir = () => {
    Cookies.remove("token");
    borrarSesion();
}

export default function Page({ params }) {
    const { external } = params;
    const key = getToken();
    const rol = getR();
    const idlogin = getE();

    console.log("el rol es:", rol);

    const router = useRouter();
    const [roles, setRoles] = useState([]);
    const [persona, setPersona] = useState({});
    const [obt, setObt] = useState(false);
    const [obt2, setObt2] = useState(false);

    const validationShema = Yup.object().shape({
        nombres: Yup.string().required('Ingrese los nombres'),
        apellidos: Yup.string().required('Ingrese los apellidos'),
        telefono: Yup.string().required('Ingrese un telefono'),
    });

    const formOptions = { resolver: yupResolver(validationShema) };
    const { register, handleSubmit, setValue, formState } = useForm(formOptions);
    const { errors } = formState;

    // Obtener los datos de la persona por el external
    if (!obt) {
        obtenerP("admin/personas/buscar/" + idlogin, key, rol).then((info) => {
            if (info.code === 200) {
                const PersonaD = info.datos;
                setPersona(PersonaD);
                setObt(true);
            } else if (info.code !== 200 && (info.tag === "token expirado o no valido" || info.tag === "token no valido" || info.tag === "no existe token")) {
                mensajes(info.tag, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login")
            } else if (info.code !== 200 && info.tag === "Acceso no autorizado") {
                router.push("/principal");
                mensajes(info.tag, "Informacion", "error");
            } else {
                mensajes("No se pudo obtener los datos de la persona", "Error", "error");
            }
        });
    };

    // Se obtienen los datos del usuario a modificar
    useEffect(() => {
        if (persona) {
            setValue('nombres', persona.nombres);
            setValue('apellidos', persona.apellidos);
            setValue('telefono', persona.telefono);
            setValue('correo', persona.cuenta?.correo);
            setValue('rol', persona.rol?.external_id);
        }
    }, [persona, setValue]);


    // Obtener el rol para listar en cbx
    if (!obt2) {
        obtenerR('admin/rol', key, rol).then((info) => {
            if (info.code === 200) {
                setRoles(info.datos);
                setObt2(true);
            } else if (info.code !== 200 && (info.tag === "token expirado o no valido" || info.tag === "token no valido" || info.tag === "no existe token")) {
                mensajes(info.tag, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login")
            } else if (info.code !== 200 && info.tag === "Acceso no autorizado") {
                router.push("/principal");
                mensajes(info.tag, "Informacion", "error");
            } else {
                mensajes("No se pudo listar los roles", "Error", "error");
            }
        });
    };

    // Enviar datos para modificar
    const sendData = (data) => {
        var datos = {
            'nombres': data.nombres,
            'apellidos': data.apellidos,
            'telefono': data.telefono,
            'correo': data.correo,
            'external': external,
            'rol': data.rol,
        };

        guardar('admin/personas/modificar/', datos, key, rol).then((info) => {
            if (info.code === 200) {
                mensajes("Usuario modificado correctamente", "Informacion", "success");
                if (rol === "Administrador General") {
                    router.push("/usuarios");
                } else {
                    router.push("/usuarios");
                }
            } else if (info.code !== 200 && (info.tag === "token expirado o no valido" || info.tag === "token no valido" || info.tag === "no existe token")) {
                mensajes(info.tag, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login");
            } else if (info.code !== 200 && info.tag === "Acceso no autorizado") {
                router.push("/usuarios");
                mensajes(info.tag, "Informacion", "error");
            } else {
                mensajes("El usuario no se pudo modificar", "Error", "error");
            }
        });
    };

    return (
        <div className="wrapper" style={{ backgroundColor: 'white' }}>
            <Menu />
            <center>
                <div className="d-flex flex-column" style={{ width: 700 }}>
                    <h1 className="text-center my-3" style={{ margin: '20px 0' }}>Mis Datos</h1>
                    <div className='container-fluid' style={{ border: '4px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
                        <div className="container-fluid">
                            <img className="card" src="/img/perfil.png" style={{ width: 90, height: 90 }} />
                        </div>
                        <br />
                        <form className="user">
                            {/* Mostrar nombre y apellido */}
                            <div className="row mb-4">
                                <div className="col">
                                <b><a>Nombres:</a></b>
                                    <input readOnly value={persona.nombres} className="form-control" placeholder='Nombres' />
                                </div>
                                <div className="col">
                                <b><a>Apellidos:</a></b>
                                    <input readOnly value={persona.apellidos} className="form-control" placeholder='Apellidos' />
                                </div>
                            </div>
                            {/* Mostrar cedula y telefono */}
                            <div className="row mb-4">
                                <div className="col">
                                <b><a>Telefono:</a></b>
                                    <input readOnly value={persona.telefono} className="form-control" placeholder='Teléfono' />
                                </div>
                            </div>
                            {
                                <div className="row mb-4">
                                    <div className="col">
                                    <b><a>Correo Electronico:</a></b>
                                        <input readOnly value={persona.cuenta?.correo} className="form-control" placeholder='Correo electrónico' />
                                    </div>
                                </div>
                            }
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                <Link href={`/perfilUsuario/modificar/${idlogin}`} className="btn btn-warning font-weight-bold mb-2" style={{ flex: '1', width: '150px', textAlign: 'center' }}>
                                    Modificar
                                </Link>
                                <Link href="/login" onClick={salir} className="btn btn-outline-danger" style={{ flex: '1', width: '150px', textAlign: 'center' }}>
                                    Cerrar sesion
                                </Link>
                            </div>


                        </form>
                    </div>
                </div>
            </center>
            <br />
            <Footer />
        </div>
    );
}
