'use client';

import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

import mensajes from "@/componentes/Mensajes";
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import { guardar, obtenerP, obtenerR } from "@/hooks/Conexion";
import { borrarSesion, getR, getToken } from "@/hooks/SessionUtilClient";

export default function Page({ params }) {
    const { external } = params;
    const key = getToken();
    const rol = getR();
    const router = useRouter();

    const [sensores, setSensores] = useState([]);
    const [roles, setRoles] = useState([]);
    const [persona, setPersona] = useState({});
    const [isDataFetched, setIsDataFetched] = useState(false);

    const validationSchema = Yup.object().shape({
        descripcion: Yup.string().required('Ingrese la descripción'),
        estado: Yup.string().required('Ingrese el estado'),
        sensores: Yup.array().min(1, 'Seleccione al menos un sensor'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, setValue, getValues, formState } = useForm(formOptions);
    const { errors } = formState;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener datos de la persona
                const personaResponse = await obtenerP(`/admin/obtenermota/${external}`, key, rol);
                if (personaResponse.code === 200) {
                    setPersona(personaResponse.datos);
                    setValue('descripcion', personaResponse.datos.descripcion);
                    setValue('estado', personaResponse.datos.estado === 1 ? 'activo' : 'desactivado');
                } else {
                    handleError(personaResponse);
                    return;
                }

                // Obtener sensores
                const sensoresResponse = await obtenerR('admin/sensor', key, rol);
                if (sensoresResponse.code === 200) {
                    setSensores(sensoresResponse.datos);
                } else {
                    handleError(sensoresResponse);
                    return;
                }

                // Obtener roles
                const rolesResponse = await obtenerR('admin/rol', key, rol);
                if (rolesResponse.code === 200) {
                    setRoles(rolesResponse.datos);
                } else {
                    handleError(rolesResponse);
                }

                setIsDataFetched(true);
            } catch (error) {
                mensajes("Error en la solicitud", "Error", "error");
                console.error(error);
            }
        };

        fetchData();
    }, [external, key, rol, setValue]);

    const handleError = (response) => {
        if (response.code !== 200 && ["token expirado o no valido", "token no valido", "no existe token"].includes(response.tag)) {
            mensajes(response.tag, "Error", "error");
            Cookies.remove("token");
            borrarSesion();
            router.push("/login");
        } else if (response.code !== 200 && response.tag === "Acceso no autorizado") {
            mensajes(response.tag, "Informacion", "error");
            router.push("/principal");
        } else {
            mensajes("Error desconocido", "Error", "error");
        }
    };

    const sendData = (data) => {
        const estado = data.estado === 'activo' ? 1 : 0;
        const datos = {
            descripcion: data.descripcion,
            external: external,
            estado: estado,
            sensor_id: data.sensores
        };
        console.log("Esta es la data que quiero enviar para modificar la mota:", datos);

        guardar('/admin/mota/modificar', datos, key, rol).then((info) => {
            console.log("Esta es la data que quiero enviar para modificar la mota:", datos);

            if (info.code === 200) {
                mensajes("Usuario guardado correctamente", "Informacion", "success");
                router.push("/motas");
            } else {
                mensajes("Usuario no se pudo guardar", "Error", "error");
            }
        });
    };

    return (
        <div className="wrapper" style={{ backgroundColor: 'white' }}>
            <Menu />
            <center>
                <div className="d-flex flex-column" style={{ width: 700 }}>
                    <h1 className="text-center my-3" style={{ margin: '20px 0' }}>Modificar Mota</h1>
                    <div className='container-fluid' style={{ border: '4px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
                        <div className="container-fluid">
                            <img className="card" src="/img/sensor.png" style={{ width: 90, height: 90 }} />
                        </div>
                        <br />
                        <form className="user" onSubmit={handleSubmit(sendData)}>
                            {/*Ingresar nombre y apellido*/}
                            <div className="row mb-4">
                            <strong><label>Descripcion:</label></strong>
                                <div className="col">
                                    <input {...register('descripcion')} name="descripcion" id="descripcion" className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} placeholder='Ingrese la descripción' />
                                    <div className='alert alert-danger invalid-feedback'>{errors.descripcion?.message}</div>
                                </div>
                            </div>

                            {/*Ingresar estado*/}
                            <div className="row mb-4">
                            <strong><label>Estado de la mota:</label></strong>
                                <div className="col">
                                    <select {...register('estado')} name="estado" id="estado" className={`form-control ${errors.estado ? 'is-invalid' : ''}`}>
                                        <option value="activo">Activo</option>
                                        <option value="desactivado">Desactivado</option>
                                    </select>
                                    <div className='alert alert-danger invalid-feedback'>{errors.estado?.message}</div>
                                </div>
                            </div>

                            {/*Seleccionar sensores*/}
                            <strong><label>Sensores:</label></strong>
                            <div className="row mb-4">
                                <div className="col" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                                    <div className={`form-group ${errors.sensores ? 'is-invalid' : ''}`}>
                                        <label>Seleccione los sensores:</label>
                                        {sensores.map((aux, i) => (
                                            <div key={i} className="form-check d-flex align-items-center">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`sensor-${aux.id}`}
                                                    value={aux.id}
                                                    {...register('sensores')}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <label className="form-check-label" htmlFor={`sensor-${aux.id}`} style={{ marginBottom: '0' }}>
                                                    {aux.tipo}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='alert alert-danger invalid-feedback'>{errors.sensores?.message}</div>
                                </div>
                            </div>

                            <hr />

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link href="/motas" className="btn btn-outline-danger" style={{ flex: '1', marginRight: '4px', borderRadius: '5px' }}>
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
