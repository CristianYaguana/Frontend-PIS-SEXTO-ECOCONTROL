'use client';
import mensajes from "@/componentes/Mensajes";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { obtenerR, guardar } from "@/hooks/Conexion";
import { useState, useEffect } from "react";
import { borrarSesion, getR, getToken, getE } from "@/hooks/SessionUtilClient";
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';

export default function Page() {
    const router = useRouter();
    const key = getToken();
    const rol = getR();
    const externalpersona = getE();

    const [sensores, setSensores] = useState([]);
    const [obt, setObt] = useState(false);

    useEffect(() => {
        if (!obt) {
            obtenerR('admin/sensor', key, rol).then((info) => {
                if (info.code === 200) {
                    setSensores(info.datos);
                    setObt(true);
                } else if (info.code !== 200 && (info.tag === "token expirado o no valido" || info.tag === "token no valido" || info.tag === "no existe token")) {
                    mensajes(info.tag, "Error", "error");
                    Cookies.remove("token");
                    borrarSesion();
                    router.push("/login");
                } else if (info.code !== 200 && info.tag === "Acceso no autorizado") {
                    router.push("/principal");
                    mensajes(info.tag, "Informacion", "error");
                } else {
                    mensajes("No se pudo Listar los roles", "Error", "error");
                }
            });
        }
    }, [obt, key, rol, router]);

    const validationSchema = Yup.object().shape({
        descripcion: Yup.string().required('Ingrese la descripcion')
        
      });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

    const sendData = (data) => {
        const datos = {
            descripcion: data.descripcion,
            persona_id: externalpersona,
            sensor_id: data.sensores
        };

        guardar('/admin/mota/guardar', datos, key, rol).then((info) => {
            if (info.code === 200) {
                mensajes("Usuario guardado correctamente", "Informacion", "success");
                router.push("/motas");
            } else {
                mensajes("Usuario no se pudo guardar", "Error", "error");
            }
        console.log(" esta es la data que quiero enviar:",datos)
        });
    };


    return (
        <div className="row">
            <Menu />
            <center>
                <br />
                <div className="d-flex flex-column" style={{ width: 700 }}>
                    <h1 style={{ textAlign: "center", fontSize: "1.5em" }}>Registrar Usuario</h1>
                    <div className="container-fluid" style={{ border: '4px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
                        <div className="container-fluid">
                            <img className="card" src="/img/sensor.png" style={{ width: 90, height: 90 }} alt="User" />
                        </div>
                        <br />
                        <form className="user" onSubmit={handleSubmit(sendData)}>
                            <div className="row mb-4">
                                <div className="col" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                                    <strong><label>Descripcion</label></strong>
                                    <input {...register('descripcion')} type="text" id="descripcion" className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} placeholder='Ingrese los descripcion' />
                                    <div className='alert alert-danger invalid-feedback'>{errors.descripcion?.message}</div>
                                </div>
                            </div>
                            
                            <div className="row mb-4">
                                <div className="col" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                                    <div className={`form-group ${errors.sensores ? 'is-invalid' : ''}`}>
                                        <label>Seleccione los sensores:</label>
                                        {sensores.map((aux, i) => (
                                            <div key={i} className="form-check d-flex align-items-center">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`rol-${aux.id}`}
                                                    value={aux.id}
                                                    {...register('sensores')}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <label className="form-check-label" htmlFor={`sensores-${aux.id}`} style={{ marginBottom: '0' }}>
                                                    {aux.tipo}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='alert alert-danger invalid-feedback'>{errors.sensores?.message}</div>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <Link href="/motas" className="btn btn-outline-danger" style={{ flex: '1', marginRight: '4px', borderRadius: '5px' }}>
                                    Cancelar
                                </Link>
                                <button type="submit" className="btn btn-outline-success" style={{ flex: '1', marginLeft: '4px', borderRadius: '5px' }}>
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
            </center>
            <br />
            <Footer />
        </div>
    );
}
