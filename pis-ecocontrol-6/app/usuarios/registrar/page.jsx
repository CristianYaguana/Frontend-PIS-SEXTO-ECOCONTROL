'use client';
import mensajes from "@/componentes/Mensajes";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { obtenerR, guardar } from "@/hooks/Conexion";
import { useState, useEffect } from "react";
import { borrarSesion, getR, getToken } from "@/hooks/SessionUtilClient";
import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';

export default function Page() {
  const router = useRouter();
  const key = getToken();
  const rol = getR();

  const [roles, setRoles] = useState([]);
  const [obt, setObt] = useState(false);

  useEffect(() => {
    if (!obt) {
      obtenerR('admin/rol', key, rol).then((info) => {
        if (info.code === 200) {
          setRoles(info.datos);
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
    nombres: Yup.string().required('Ingrese los nombres'),
    apellidos: Yup.string().required('Ingrese los apellidos'),
    telefono: Yup.string().required('Ingrese un teléfono').matches(/^[0-9]+$/, 'Ingrese solo números'),
    rol: Yup.string().required('Seleccione un rol'),
    correo: Yup.string().required('Ingrese un correo electrónico').email('Se requiere correo válido').test("error", 'Debe ingresar un correo institucional de la UNL (unl.edu.ec)', (value) => {
      if (value) {
        const dominio = value.split('@')[1];
        return dominio === 'unl.edu.ec';
      }
      return false;
    })
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

  const sendData = (data) => {
    const datos = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      telefono: data.telefono,
      correo: data.correo,
      rol: data.rol
    };

    guardar('admin/personas/guardar', datos, key, rol).then((info) => {
      if (info.code === 200) {
        mensajes("Usuario guardado correctamente", "Informacion", "success");
        router.push("/usuarios");
      } else {
        mensajes("Usuario no se pudo guardar", "Error", "error");
      }
    });
  };

  return (
    <div className="row" style={{ backgroundColor: 'white' }}>
      <Menu />
      <center>
        <br />
        <div className="d-flex flex-column" style={{ width: 700 }}>
          <h1 style={{ textAlign: "center", fontSize: "1.5em" }}>Registrar Usuario</h1>
          <div className="container-fluid" style={{ border: '4px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
            <div className="container-fluid">
              <img className="card" src="/img/user.png" style={{ width: 90, height: 90 }} alt="User" />
            </div>
            <br />
            <form className="user" onSubmit={handleSubmit(sendData)}>
              <div className="row mb-4">
                <div className="col" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                  <strong><label>Nombres</label></strong>
                  <input {...register('nombres')} type="text" id="nombres" className={`form-control ${errors.nombres ? 'is-invalid' : ''}`} placeholder='Ingrese los nombres' />
                  <div className='alert alert-danger invalid-feedback'>{errors.nombres?.message}</div>
                </div>
                <div className="col" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                  <strong><label>Apellidos</label></strong>
                  <input {...register('apellidos')} type="text" id="apellidos" className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} placeholder='Ingrese los apellidos' />
                  <div className='alert alert-danger invalid-feedback'>{errors.apellidos?.message}</div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                  <strong><label>Telefono</label></strong>
                  <input {...register('telefono')} type="text" id="telefono" className={`form-control ${errors.telefono ? 'is-invalid' : ''}`} placeholder='Ingrese nro teléfono' />
                  <div className='alert alert-danger invalid-feedback'>{errors.telefono?.message}</div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                  <strong><label>Correo</label></strong>
                  <input {...register('correo')} type="text" id="correo" className={`form-control ${errors.correo ? 'is-invalid' : ''}`} placeholder='Ingrese correo electrónico' />
                  <div className='alert alert-danger invalid-feedback'>{errors.correo?.message}</div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                  <select {...register('rol')} id="rol" className={`form-control ${errors.rol ? 'is-invalid' : ''}`}>
                    <option>Elija un rol</option>
                    {roles.map((aux, i) => (
                      <option key={i} value={aux.id}>{aux.nombre}</option>
                    ))}
                  </select>
                  <div className='alert alert-danger invalid-feedback'>{errors.rol?.message}</div>
                </div>
              </div>
              <div className="row mb-4">
                <Link href="/usuarios" className="btn btn-outline-danger" style={{ flex: '1', marginRight: '4px', borderRadius: '5px' }}>
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
