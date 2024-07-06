'use client'

import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import { borrarSesion, getRol, getToken } from '@/hooks/SessionUtilClient';
import { useEffect } from 'react';
import { obtenerR } from '@/hooks/Conexion';
import mensajes from '@/componentes/Mensajes';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Principal() {
    const key = getToken();
    const rol = getRol();
    const router = useRouter();

    useEffect(() => {
        obtenerR('admin/rol', key, rol).then((info) => {
            if (info.code !== 200 && (info.tag === "token expirado o no valido" || info.tag === "token no valido" || info.tag === "no existe token")) {
                mensajes(info.tag, "Error", "error");
                Cookies.remove("token");
                borrarSesion();
                router.push("/login");
            }
        });
    }, []);

    return (
        <div className="row">
            <div className="container-fluid p-1" >
                <Menu />
                <div className="d-flex flex-column align-items-center">
                    <div className="content-fluid" >

                        <div className="container-fluid" >
                            <br />
                            <img src="./img/UNL3.png" alt="UNL " style={{ width: 500, height: 440, opacity: 0.2 }} />
                        </div>
                    </div>
                </div>
                <br />
                <Footer />
            </div>
        </div>
    );
}