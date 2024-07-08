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
    const router = useRouter();


    return (
        <div className="row">
            <div className="container-fluid p-1" >
            <Menu />
                <div className="d-flex flex-column align-items-center">
                    <div className="content-fluid" >
                    </div>
                </div>
                <br />
                
            </div>
            <Footer />
        </div>
        
    );
}