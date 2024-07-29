'use client'

import Menu from '@/componentes/menu';
import Footer from '@/componentes/footer';
import { useRouter } from 'next/navigation';;
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