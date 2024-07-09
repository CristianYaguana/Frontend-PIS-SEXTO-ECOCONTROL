'use client'

import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import { borrarSesion, getRol, getToken } from '@/hooks/SessionUtilClient';
import { useEffect } from 'react';
import { obtenerR } from '@/hooks/Conexion';
import mensajes from '@/componentes/Mensajes';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Dashboard from '@/componentes/Dashboard';

export default function Principal() {
    const router = useRouter();


    return (
        <>

            <Menu />

            <Dashboard />
            <Footer />
        </>

    );
}