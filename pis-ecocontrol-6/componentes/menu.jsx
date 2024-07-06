'use client';

import { borrarSesion, getRol } from "@/hooks/SessionUtilClient";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Sidebar() {
    const rol = getRol();

    const salir = () => {
        Cookies.remove("token");
        borrarSesion();
    }

    return (
        <div className="d-flex flex-column vh-100 bg-primary p-3" style={{ width: '250px' }}>
            <img src="https://siaaf.unl.edu.ec/static/img/logo.png" width={180} alt="logo" className="mb-4" />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link className="nav-link active text-white mb-2" aria-current="page" href="/principal">Inicio</Link>
                </li>

                {rol === "Administrador" && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link active text-white mb-2" aria-current="page" href="/usuarios">Gestion Usuarios</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active text-white mb-2" aria-current="page" href="/sensores">Gestion Sensores</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active text-white mb-2" aria-current="page" href="/configuracion">ESP32 Maestro</Link>
                        </li>
                    </>
                )}

                <li className="nav-item">
                    <Link className="nav-link active text-white mb-2" aria-current="page" href="/pronosticos">Pronósticos</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link active text-white mb-2" aria-current="page" href="/informacion">Ayuda</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active text-white mb-2" aria-current="page" href="/login" onClick={salir}>Salir</Link>
                </li>
            </ul>
            <div className="mt-auto">
                <label className="text-white" style={{ marginRight: 10 }}>perfil</label>
                <div className="dropdown">
                    <Link href="/perfilUsuario" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <img src="/img/avatar.png" className="rounded-circle" height="70" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
