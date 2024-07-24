"use client";

export const getId = () => {
    return window.sessionStorage.getItem("user");
}

export const getE = () => {
    return window.sessionStorage.getItem("external");
}

export const getR = () => {
    return window.sessionStorage.getItem("rol");
}

export const getToken = () => {
    return window.sessionStorage.getItem("token");
}

export const borrarSesion = () => {
    window.sessionStorage.clear();
    
}

export const estaSesion = () => {
    var token = window.sessionStorage.getItem("token");
    return (token && (token !== 'undefined' && token !== null && token !== 'null'));

};