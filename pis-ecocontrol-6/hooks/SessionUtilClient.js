"use client";

export const getId = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem("user");
    }
    return null;
}

export const getE = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem("external");
    }
    return null;
}

export const getR = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem("rol");
    }
    return null;
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem("token");
    }
    return null;
}

export const borrarSesion = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.clear();
    }
}

export const estaSesion = () => {
    if (typeof window !== 'undefined') {
        var token = sessionStorage.getItem('token');
        return (token && (token !== 'undefined' && token !== null && token !== 'null'));
    }
    return false;
}
