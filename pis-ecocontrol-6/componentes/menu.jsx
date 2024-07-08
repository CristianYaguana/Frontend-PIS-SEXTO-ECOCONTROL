'use client';

import { borrarSesion } from "@/hooks/SessionUtilClient";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Sidebar() {
    const salir = () => {
        Cookies.remove("token");
        borrarSesion();
    };

    return (
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <div className="logo-and-links">
                <img src="https://i.ibb.co/rHQrMSt/logo-pis.png" width={150} alt="logo" className="logo" />
                <ul>
                    <li><Link href="/" legacyBehavior><a className="active">Principal</a></Link></li>
                    <li><Link href="/about" legacyBehavior><a>Reportes</a></Link></li>
                    <li><Link href="/services" legacyBehavior><a>Usuarios</a></Link></li>
                    <li><Link href="/contact" legacyBehavior><a>Sensores</a></Link></li>
                    <li><a href="#" onClick={salir}>SALIR</a></li>
                </ul>
            </div>
            <style jsx>{`
                * {
                    padding: 0;
                    margin: 0;
                    text-decoration: none;
                    list-style: none;
                    box-sizing: border-box;
                }
                body {
                    font-family: "Montserrat", sans-serif;
                }
                nav {
                    background: rgba(37, 94, 142, 1);
                    
                    width: 100%;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                }
                .logo-and-links {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }
                .logo {
                    margin-right: 20px;
                }
                nav ul {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    width: 100%;
                }
                nav ul li {
                    margin: 0 10px;
                }
                nav ul li a {
                    color: white;
                    font-size: 17px;
                    padding: 7px 13px;
                    border-radius: 3px;
                    text-transform: uppercase;
                }
                a.active, a:hover {
                    background: #1b9bff;
                    transition: .5s;
                }
                .checkbtn {
                    font-size: 30px;
                    color: white;
                    cursor: pointer;
                    display: none;
                }
                #check {
                    display: none;
                }
                @media (max-width: 952px) {
                    nav ul li a {
                        font-size: 16px;
                    }
                }
                @media (max-width: 858px) {
                    .checkbtn {
                        display: block;
                    }
                    nav ul {
                        position: fixed;
                        width: 100%;
                        height: 100vh;
                        background: #2c3e50;
                        top: 0;
                        left: -100%;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        transition: all .5s;
                    }
                    nav ul li {
                        margin: 50px 0;
                    }
                    nav ul li a {
                        font-size: 20px;
                    }
                    a:hover, a.active {
                        background: none;
                        color: #0082e6;
                    }
                    #check:checked ~ ul {
                        left: 0;
                    }
                }
            `}</style>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        </nav>
    );
}

