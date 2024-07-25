"use client";

export const save = (key, data) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, data);
    }
}

export const get = (key) => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    return null;
}

export const saveToken = (key) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem("token", key);
    }
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
