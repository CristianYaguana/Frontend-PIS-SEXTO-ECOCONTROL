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
    const [persona, setPersona] = useState({});
    const [obt, setObt] = useState(false);

    const validationSchema = Yup.object().shape({
        nombres: Yup.string().required('Ingrese los nombres'),
        apellidos: Yup.string().required('Ingrese los apellidos'),
        telefono: Yup.string().required('Ingrese un telefono'),
        correo: Yup.string().required('Ingrese un correo electronico').email('Se requiere correo valido').test("error", 'Debe ingresar un correo institucional de la UNL (unl.edu.ec)', (value) => {
            if (value) {
                const dominio = value.split('@')[1];
                return dominio === 'unl.edu.ec';
            }
            return false;
        })
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, setValue, formState } = useForm(formOptions);
    const { errors } = formState;

    // Obtener los datos de la persona por el external
    useEffect(() => {
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
        }
    }, [obt, idlogin, key, rol, router]);

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



    // Enviar datos para modificar
    const sendData = (data) => {
        var datos = {
            'nombres': data.nombres,
            'apellidos': data.apellidos,
            'telefono': data.telefono,
            'correo': data.correo,
            'nuevaClave': data.nuevaClave,
            'external': external,
            'rol': data.rol,

        };

        async function modificarUsuario(idlogin, datos, key, rol) {
            try {
                // Primero, intenta cambiar la clave
                const cambiarClaveInfo = await guardar('admin/personas/cambiarclave/' + idlogin, datos, key, rol);

                if (cambiarClaveInfo.code === 200) {
                    mensajes("Clave cambiada correctamente", "Informacion", "success");

                    // Ahora, intenta modificar la cuenta
                    const modificarCuentaInfo = await guardar('/admin/personas/modificarcuenta/' + idlogin, datos, key, rol);

                    if (modificarCuentaInfo.code === 200) {
                        mensajes("Usuario modificado correctamente", "Informacion", "success");
                        router.push("/perfilUsuario");
                    } else if (modificarCuentaInfo.code !== 200 && (modificarCuentaInfo.tag === "token expirado o no valido" || modificarCuentaInfo.tag === "token no valido" || modificarCuentaInfo.tag === "no existe token")) {
                        mensajes(modificarCuentaInfo.tag, "Error", "error");
                        Cookies.remove("token");
                        borrarSesion();
                        router.push("/login");
                    } else if (modificarCuentaInfo.code !== 200 && modificarCuentaInfo.tag === "Acceso no autorizado") {
                        router.push("/perfilUsuario");
                        mensajes(modificarCuentaInfo.tag, "Informacion", "error");
                    } else {
                        mensajes("El usuario no se pudo modificar", "Error", "error");
                    }

                } else if (cambiarClaveInfo.code !== 200 && (cambiarClaveInfo.tag === "token expirado o no valido" || cambiarClaveInfo.tag === "token no valido" || cambiarClaveInfo.tag === "no existe token")) {
                    mensajes(cambiarClaveInfo.tag, "Error", "error");
                    Cookies.remove("token");
                    borrarSesion();
                    router.push("/login");
                } else if (cambiarClaveInfo.code !== 200 && cambiarClaveInfo.tag === "Acceso no autorizado") {
                    router.push("/perfilUsuario");
                    mensajes(cambiarClaveInfo.tag, "Informacion", "error");
                } else {
                    mensajes("La contraseña debe tener al menos 8 caracteres, incluir letras, números y caracteres especiales.", "Error", "error");
                }
            } catch (error) {
                mensajes("Error en la modificación del usuario", "Error", "error");
            }
        }

        // Llamada a la función
        modificarUsuario(idlogin, datos, key, rol);


    };

    return (
        <div className="wrapper" style={{ backgroundColor: 'white' }}>
            <Menu />
            <center>
                <div className="d-flex flex-column" style={{ width: 700 }}>
                    <h1 className="text-center my-3" style={{ margin: '20px 0' }}>Modificar mis Datos</h1>
                    <div className='container-fluid' style={{ border: '4px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
                        <div className="container-fluid">
                            <img className="card" src="/img/perfil.png" style={{ width: 90, height: 90 }} />
                        </div>
                        <br />
                        <form className="user" onSubmit={handleSubmit(sendData)}>
                            {/* Mostrar nombre y apellido */}
                            <div className="row mb-4">
                                <div className="col">
                                    <b><a>Nombres:</a></b>
                                    <input
                                        {...register('nombres')}
                                        defaultValue={persona.nombres}
                                        className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                                        placeholder='Nombres'
                                    />
                                    <div className="invalid-feedback">{errors.nombres?.message}</div>
                                </div>
                                <div className="col">
                                    <b><a>Apellidos:</a></b>
                                    <input
                                        {...register('apellidos')}
                                        defaultValue={persona.apellidos}
                                        className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                                        placeholder='Apellidos'
                                    />
                                    <div className="invalid-feedback">{errors.apellidos?.message}</div>
                                </div>
                            </div>
                            {/* Mostrar cedula y telefono */}
                            <div className="row mb-4">
                                <div className="col">
                                    <b><a>Tefelono:</a></b>
                                    <input
                                        {...register('telefono')}
                                        defaultValue={persona.telefono}
                                        className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                        placeholder='Teléfono'
                                    />
                                    <div className="invalid-feedback">{errors.telefono?.message}</div>
                                </div>
                            </div>
                            {
                                <div className="row mb-4">
                                    <div className="col">
                                        <b><a>Correo Electronico:</a></b>

                                        <input
                                            {...register('correo')}
                                            defaultValue={persona.cuenta?.correo}
                                            className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                                            placeholder='Correo electrónico'
                                        />
                                        <div className="invalid-feedback">{errors.correo?.message}</div>
                                    </div>
                                </div>
                            }
                            <div className="row mb-4">
                                <div className="col">
                                    <b><a>Ingrese su nueva Contraseña:</a></b>
                                    <input
                                        type="password"
                                        {...register('nuevaClave')}
                                        className={`form-control ${errors.nuevaClave ? 'is-invalid' : ''}`}
                                        placeholder='Nueva Contraseña'
                                    />
                                    <div className="invalid-feedback">{errors.nuevaClave?.message}</div>
                                </div>
                            </div>

                            <hr />
                            <div style={{ display: 'flex', gap: '8px' }}>

                                <button type='submit' className="btn btn-outline-success" style={{ flex: '1', marginLeft: '4px', borderRadius: '5px' }}>
                                    Guardar
                                </button>
                                <Link href="/perfilUsuario" className="btn btn-outline-danger" style={{ flex: '1', marginRight: '4px', borderRadius: '5px' }}>
                                    Cancelar
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
