'use client';

import { borrarSesion } from "@/hooks/SessionUtilClient";
import Cookies from "js-cookie";
import Link from "next/link";
import { FaHome, FaChartBar, FaCalendarCheck, FaUsers, FaSignal, FaSignOutAlt } from "react-icons/fa"; // Importa los íconos de react-icons

export default function Sidebar() {

    const salir = () => {
        Cookies.remove("token");
        borrarSesion();
    }

    return (
        <div className="d-flex flex-column vh-100 bg-primary p-3" style={{ width: '250px', color: '#fff' }}>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-3">
                    <Link className="nav-link text-white d-flex align-items-center justify-content-start" aria-current="page" href="/principal">
                        <FaHome className="mr-2" /> Principal
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link className="nav-link text-white d-flex align-items-center justify-content-start" aria-current="page" href="/reportes">
                        <FaChartBar className="mr-2" /> Reportes
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link className="nav-link text-white d-flex align-items-center justify-content-start" aria-current="page" href="/eventos">
                        <FaCalendarCheck className="mr-2" /> Eventos
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link className="nav-link text-white d-flex align-items-center justify-content-start" aria-current="page" href="/usuarios">
                        <FaUsers className="mr-2" /> Usuarios
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link className="nav-link text-white d-flex align-items-center justify-content-start" aria-current="page" href="/sensores">
                        <FaSignal className="mr-2" /> Sensores
                    </Link>
                </li>
            </ul>
            <div className="mt-auto d-flex align-items-center">
                <Link className="nav-link text-white d-flex align-items-center justify-content-start" aria-current="page" href="/login" onClick={salir}>
                    <FaSignOutAlt className="mr-2" /> Cerrar sesión
                </Link>
            </div>
        </div>
    );
}
