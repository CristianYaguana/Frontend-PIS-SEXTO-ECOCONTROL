'use client';
import mensajes from "@/componentes/Mensajes";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { guardar, obtenerP, obtenerR } from "@/hooks/Conexion";
import { useEffect, useState } from "react";
import { borrarSesion, getR, getToken } from "@/hooks/SessionUtilClient";
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import Cookies from "js-cookie";

export default function Page({ params }) {
    const { external } = params;
    const key = getToken();
    const rol = getR();

    console.log("el rol ess:", rol)

    const router = useRouter();
    const [roles, setRoles] = useState([]);
    const [persona, setPersona] = useState([]);
    const [obt, setObt] = useState(false);
    const [obt2, setObt2] = useState(false);

    const validationShema = Yup.object().shape({
        nombres: Yup.string().required('Ingrese los nombres'),
        apellidos: Yup.string().required('ingrese los apellidos'),
        telefono: Yup.string().required('ingrese un telefono'),
    });

    const formOptions = { resolver: yupResolver(validationShema) };
    const { register, handleSubmit, setValue, formState } = useForm(formOptions);
    const { errors } = formState;

    //obtener los datos de las personas por el external
    if (!obt) {
        obtenerP("admin/personas/buscar/" + external, key, rol).then((info) => {
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
                router.push("/principal")
                mensajes(info.tag, "Informacion", "error");
            } else {
                mensajes("No se pudo obtener los datos de la persona", "Error", "error");
            }
        });
    };

    //se obtienen los datos del usuario a modificar
    useEffect(() => {

        setValue('nombres', persona.nombres);
        setValue('apellidos', persona.apellidos);
        setValue('telefono', persona.telefono);
        setValue('rol', persona.rol?.external_id);

    }, [persona, setValue]);

    //obtener el rol para listar en cbx
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
                router.push("/principal")
                mensajes(info.tag, "Informacion", "error");
            } else {
                mensajes("No se pudo Listar los roles", "Error", "error");
            }
        });
    };

    //enviar datos para  modificar
    const sendData = (data) => {

        var datos = {
            'nombres': data.nombres,
            'apellidos': data.apellidos,
            'telefono': data.telefono,
            'external': external,
            'rol': data.rol,
        };

        guardar('admin/personas/modificar/', datos, key, rol).then((info) => {
            console.log("el rol ess:", rol)
            if (info.code === 200) {
                mensajes("Usuario modificado correctamente", "Informacion", "success")
                if (rol === "Administrador General") {
                    router.push("/usuarios");
                } else {
                    router.push("/usuarios");
                }
            } else if (info.code !== 200 && (info.tag === "token expirado o no valido" || info.tag === "token no valido" || info.tag === "no existe token")) {
                mensajes(info.tag, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login")
            } else if (info.code !== 200 && info.tag === "Acceso no autorizado") {
                router.push("/usuarios")


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
                    <h1 className="text-center my-3" style={{ margin: '20px 0' }}>Modificar Usuario</h1>
                    <div className='container-fluid' style={{ border: '4px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>

                        <div className="container-fluid" >

                            <img className="card" src="/img/editarUser.png" style={{ width: 90, height: 90 }} />
                        </div>
                        <br />
                        <form className="user" onSubmit={handleSubmit(sendData)}>

                            {/*Ingresar nombre y apellido*/}
                            <div className="row mb-4">
                                <div className="col">
                                    <input {...register('nombres')} name="nombres" id="nombres" className={`form-control ${errors.nombres ? 'is-invalid' : ''}`} placeholder='Ingrese los nombres' />
                                    <div className='alert alert-danger invalid-feedback'>{errors.nombres?.message}</div>
                                </div>
                                <div className="col">
                                    <input {...register('apellidos')} name="apellidos" id="apellidos" className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} placeholder='Ingrese los apellidos' />
                                    <div className='alert alert-danger invalid-feedback'>{errors.apellidos?.message}</div>
                                </div>
                            </div>

                            {/*Ingresar cedula y telefono*/}
                            <div className="row mb-4">
                                <div className="col">
                                    <input {...register('telefono')} name="telefono" id="telefono" className={`form-control ${errors.telefono ? 'is-invalid' : ''}`} placeholder='Ingrese nro telefono' />
                                    <div className='alert alert-danger invalid-feedback'>{errors.telefono?.message}</div>
                                </div>
                            </div>



                            {/* Seleccionar rol*/}
                            {rol === "Administrador" && (
                                <div className="row mb-4">
                                    <div className="col">
                                        <input {...register('correo')} name="correo" id="correo" className={`form-control ${errors.correo ? 'is-invalid' : ''}`} placeholder='Ingrese correo electronico' />
                                        <div className='alert alert-danger invalid-feedback'>{errors.correo?.message}</div>
                                    </div>
                                    <div className="col">
                                        <select {...register('rol')} name="rol" id="rol" className={`form-control ${errors.rol ? 'is-invalid' : ''}`}>
                                            <option>Elija un rol</option>
                                            {roles.map((aux, i) => (
                                                <option key={i} value={aux.external_id} >
                                                    {`${aux.nombre}`}
                                                </option>
                                            ))}
                                        </select>
                                        <div className='alert alert-danger invalid-feedback'>{errors.rol?.message}</div>
                                    </div>

                                </div>
                            )}
                            <hr />

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link href="/usuarios" className="btn btn-outline-danger" style={{ flex: '1', marginRight: '4px', borderRadius: '5px' }}>
                                    Cancelar
                                </Link>

                                <button type='submit' className="btn btn-outline-success" style={{ flex: '1', marginLeft: '4px', borderRadius: '5px' }}>
                                    Guardar
                                </button>
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