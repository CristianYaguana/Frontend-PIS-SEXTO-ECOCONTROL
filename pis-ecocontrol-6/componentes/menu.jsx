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
        <div>
            <style jsx>{`
            *,
::before,
::after {
    box-sizing: border-box;
}
body {
    background: white;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
.unstyled {
    list-style: none;
    padding: 0;
    margin: 0;
}
.unstyled a {
    text-decoration: none;
}
.list-inline {
    overflow: hidden;
}
.list-inline li {
    float: left;
}
.header {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 17.5em;
    background: #0d60ef;
}
.logo {
    text-transform: lowercase;
    font-family: "Oswald", sans-serif;
    text-align: center;
    padding: 0;
    margin: 0;
}
.logo a {
    display: block;
    padding: 1em 0;
    color: #dfdbd9;
    text-decoration: none;
    transition: 0.15s linear color;
}
.logo a:hover {
    color: #fff;
}
.logo a:hover span {
    color: #007bff; /* Azul */
}
.logo span {
    font-weight: 700;
    transition: 0.15s linear color;
}
.main-nav ul {
    border-top: solid 1px #ffffff;
}
.main-nav li {
    border-bottom: solid 1px #3c3735;
}
.main-nav a {
    padding: 1.1em 0;
    color: #dfdbd9;
    font-family: "Poppins", sans-serif;
    text-align: center;
}
.list-hover-slide li {
    position: relative;
    overflow: hidden;
}
.list-hover-slide a {
    display: block;
    position: relative;
    z-index: 1;
    transition: 0.35s ease color;
}
.list-hover-slide a:before {
    content: "";
    display: block;
    z-index: -1;
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100%;
    border-right: solid 5px #007bff; /* Azul */
    background: #3c3735;
    transition: 0.35s ease left;
}
.list-hover-slide a.is-current::before,
.list-hover-slide a:hover::before {
    left: 0;
}

            `}</style>
            <header className="header" role="banner">
                <h1 className="logo">
                    <img src="https://i.ibb.co/rHQrMSt/logo-pis.png" width={300} alt="logo" className="mb-4" />
                </h1>
                <div className="nav-wrap">
                    <nav className="main-nav" role="navigation">
                        <ul className="unstyled list-hover-slide">
                            <li><a href="#">Cats Food</a></li>
                            <li><a href="#">Vitamin</a></li>
                            <li><a href="#">Grooming</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
}
