'use client';

import { useRouter } from 'next/navigation';
import Head from 'next/head';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { estaSesion } from '@/hooks/SessionUtil';
import { inicio_sesion } from '@/hooks/Autenticacion';
import mensajes from '@/componentes/Mensajes';
import Cookies from 'js-cookie';

export default function Login() {
    const router = useRouter();

    // Validaciones
    const validationSchema = Yup.object().shape({
        correo: Yup.string().required('Ingrese un correo electrónico').email('Se requiere correo válido'),
        clave: Yup.string().required('Ingrese su contraseña')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

    const sendData = async (data) => {
        const loginData = { correo: data.correo, clave: data.clave };

        try {
            const info = await inicio_sesion(loginData);
            if (!estaSesion()) {
                mensajes("Error en inicio de sesión", info.tag, "error");
            } else {
                mensajes("Has ingresado al sistema", "Bienvenido usuario", "success");
                Cookies.set("token", true);
                router.push("/principal");
            }
        } catch (error) {
            mensajes("Error en inicio de sesión", error.message, "error");
        }
    };

    return (
        <>
            <Head>
                <title>Iniciar Sesión</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
            </Head>
            <body className="bg-cover bg-center" style={{ backgroundImage: 'url("https://img.freepik.com/foto-gratis/vista-arboles-bosque-verde-co2_23-2149675041.jpg?t=st=1720983456~exp=1720987056~hmac=2621159138ab261ad975c4e56f822d6dd46e5e37f0f4da1b239fc415d8d75d1d&w=996")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
                <div className="flex h-screen items-center justify-center">
                    <div className="w-full max-w-4xl h-3/4 p-8 bg-white shadow-lg rounded-lg bg-opacity-75">
                        <div className="flex h-full bg-white bg-opacity-75 rounded-lg">
                            <div className="w-1/2 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center rounded-l-lg">
                                <div className="text-center text-white">
                                    <img src="https://unl.edu.ec/sites/default/files/inline-images/logo_0.png" width="400" alt="logo" className="block mx-auto" />
                                    <h1 className="text-2xl font-bold mb-4" style={{ color: 'white' }}>¡BIENVENIDOS!</h1>
                                    <p className="text-lg" style={{ textAlign: 'justify', margin: '0 auto', maxWidth: '380px' }}>
                                        El monitoreo constante de CO2, temperatura y humedad en los espacios de la UNL no solo asegura un entorno óptimo, sino que también promueve un ambiente seguro y productivo para todos.
                                    </p>

                                </div>
                            </div>
                            <div className="w-1/2 p-4 flex flex-col justify-center">

                                <img
                                    src="https://i.ibb.co/mvf6tYV/logo-pis-azul.png"
                                    width={500}
                                    alt="logo"
                                    className="logo"
                                    style={{ display: 'block', margin: 'auto' }}
                                />
                                <div style={{ textAlign: 'center' }}>
                                    <h2 className="text-3xl font-bold mb-4" style={{ color: 'black' }}>Iniciar Sesión</h2>
                                </div>



                                <form onSubmit={handleSubmit(sendData)} className="flex-grow">
                                    <div className="mb-4">
                                        <label className="block text-muted-foreground mb-2" htmlFor="correo" style={{ color: 'black' }}>Correo</label>
                                        <input className="w-full p-2 border border-input rounded" type="text" id="correo" {...register('correo')} />
                                        {errors.correo && <p className="text-red-600">{errors.correo.message}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-muted-foreground mb-2" htmlFor="clave" style={{ color: 'black' }}>Contraseña</label>
                                        <input className="w-full p-2 border border-input rounded"   style={{ color: 'black' }} type="password" id="clave" {...register('clave')} />
                                        {errors.clave && <p className="text-red-600">{errors.clave.message}</p>}
                                    </div>
                                    <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded w-full" type="submit">Log In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}
