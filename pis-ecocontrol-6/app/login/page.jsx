'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function Login() {
    const router = useRouter();

    return (
        <>
            <style jsx global>{`
                @import "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";

$font-family-sans-serif-2: 'Roboto', sans-serif;
$font-family-serif: 'Source Serif Pro', serif;
$font-family-sans-serif: 'Roboto', sans-serif;

body {
    font-family: $font-family-sans-serif;
    background: linear-gradient(to bottom, #ffffff, #00aaff);
}
p {
    color: darken(#ccc, 10%);
    font-weight: 300;
}
h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: $font-family-sans-serif;
}
a {
    transition: .3s all ease;
    &:hover {
        text-decoration: none!important;
    }
}
.content {
    padding: 7rem 0;
}
h2 {
    font-size: 20px;
}

.half {
    &, & .container > .row {
        height: 100vh;
        min-height: 700px;
    }

    .bg {
        @include media-breakpoint-down(md) {
            height: 200px;
        }
    }
    .contents {
        background: #f6f7fc;
    }
    .contents, .bg {
        width: 50%;
        @include media-breakpoint-down(lg) {
            width: 100%;
        }
        .form-control {
            border: none;
            box-shadow: 0 1px 2px 0 rgba($black, .1);
            border-radius: 4px;
            height: 54px;
            background: $white;
            &:active, &:focus {
                outline: none;
                box-shadow: 0 1px 2px 0 rgba($black, .1);
            }
        }
    }
    .bg {
        background-size: cover;
        background-position: center;
    }
    a {
        color: #3f9ae5;
        text-decoration: underline;
    }
    .btn {
        height: 54px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .forgot-pass {
        position: relative;
        top: 2px;
        font-size: 14px;
    }
}

.control {
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 14px;
    .caption {
        position: relative;
        top: .2rem;
        color: #3896ef;
    }
}
.control input {
    position: absolute;
    z-index: -1;
    opacity: 0;
}
.control__indicator {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    background: #3389eb;
    border-radius: 4px;
}
.control--radio .control__indicator {
    border-radius: 50%;
}
.control:hover input ~ .control__indicator,
.control input:focus ~ .control__indicator {
    background: #ccc;
}
.control input:checked ~ .control__indicator {
    background: $primary;
}
.control:hover input:not([disabled]):checked ~ .control__indicator,
.control input:checked:focus ~ .control__indicator {
    background: lighten($primary, 5%);
}
.control input:disabled ~ .control__indicator {
    background: #32b6f3;
    opacity: 0.9;
    pointer-events: none;
}
.control__indicator:after {
    font-family: 'icomoon';
    content: '\e5ca';
    position: absolute;
    display: none;
    font-size: 16px;
    transition: .3s all ease;
}
.control input:checked ~ .control__indicator:after {
    display: block;
    color: #71c1ef;
}
.control--checkbox .control__indicator:after {
    top: 50%;
    left: 50%;
    margin-top: -1px;
    transform: translate(-50%, -50%);
}
.control--checkbox input:disabled ~ .control__indicator:after {
    border-color: #42a4ef;
}
.control--checkbox input:disabled:checked ~ .control__indicator {
    background-color: #7e0cf5;
    opacity: .2;
}
    
            `}</style>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="/fonts/icomoon/style.css" />
                <link rel="stylesheet" href="/css/owl.carousel.min.css" />
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/css/style.css" />
                <title>Login #2</title>
            </Head>
            <div className="d-lg-flex half">
                <div className="bg order-1 order-md-2" style={{ backgroundImage: "url('https://img.freepik.com/foto-gratis/vista-arboles-bosque-verde-co2_23-2149675038.jpg?t=st=1720451260~exp=1720454860~hmac=30b0957ebf19e50e7fc0fcd7208e6cb56569fed349054ef9664da5d5a63b649b&w=360')" }}></div>
                <div className="contents order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7">
                            <img src="https://i.ibb.co/mvf6tYV/logo-pis-azul.png" width={600} alt="logo" className="logo" />
                                <p className="mb-4">El monitoreo constante de CO2, temperatura y humedad en los espacios de la UNL no solo asegura un entorno óptimo, sino que también promueve un ambiente seguro y productivo para todos.</p>
                                <form action="#" method="post">
                                    <div className="form-group first">
                                        <label htmlFor="username">Correo</label>
                                        <input type="text" className="form-control" placeholder="sucorreo@gmail.com" id="username" />
                                    </div>
                                    <div className="form-group last mb-3">
                                        <label htmlFor="password">Contraseña</label>
                                        <input type="password" className="form-control" placeholder="Escriba su contraseña" id="password" />
                                    </div>
                                    
                                    <input type="submit" value="Log In" className="btn btn-block btn-primary" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
