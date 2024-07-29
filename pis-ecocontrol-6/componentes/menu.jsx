'use client';

import { borrarSesion, getR } from "@/hooks/SessionUtilClient";
import Cookies from "js-cookie";
import Link from "next/link";
import './globals.css';

export default function Sidebar() {
    const rol = getR();

    return (
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <div className="logo-and-links">
                <img src="https://i.ibb.co/rHQrMSt/logo-pis.png" width={150} alt="logo" className="logo" />
                <ul>
                    {/* <li><Link href="/principal" legacyBehavior>Principal</Link></li> */}
                    <li><Link href="/principal" legacyBehavior>Principal</Link></li>

                    {rol === "Administrador General" && (
                        <>

                            <li><Link href="/principal/tabla" legacyBehavior>Registro</Link></li>
                            <li><Link href="/usuarios" legacyBehavior>Usuarios</Link></li>
                            <li><Link href="/motas" legacyBehavior>Sensores</Link></li>

                        </>
                    )}

                    <li>
                        <Link href="/perfilUsuario" legacyBehavior>
                            <img src="/img/perfil.png" alt="Mod.Perfil" style={{ width: '50px', height: 'auto' }} />
                        </Link>
                    </li>

                </ul>
            </div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        </nav>
    );
}

