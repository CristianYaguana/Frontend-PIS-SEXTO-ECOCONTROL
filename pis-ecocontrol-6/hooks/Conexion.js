require('dotenv').config();

// let URL = 'http://localhost:3007/api/';
let URL = process.env.BACKEND_URL || 'https://backendpis.nicewater-f9af7c67.eastus.azurecontainerapps.io/api/';

//devolver la url
export function url_api() {
    return URL;
}

//Guardar informacion de manera general
export async function guardar(recurso, data, key = "", rol) {
    let headers = {};

    if (key !== "") {
        headers = {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "token-api": key,
            'rol-user': rol
        };
    } else {
        headers = {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        };

    }

    const response = await (fetch(URL + recurso, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }));
    console.log(response);
    return await response.json();
    
}
//buscar personas
export async function busquedaPersonas(recurso, key = "", rol) {
    let headers = {};
    headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "token-api": key,
        'rol-user': rol
    };

    const response = await (await fetch(URL + recurso, {
        method: "GET",
        headers: headers,
        cache: 'no-store'
    })).json();

    // console.log("respuesta odcs: " + response)
    return response;
}

//metodo para conectarse al backend y guardar datos de un sensor
export async function guardarSensor(recurso, imagen, data, key = "", rol) {
    const formData = new FormData();

    if (imagen === undefined) {
        formData.append('img', null);
    } else {
        formData.append('img', imagen[0]); // Agregar imagen al FormData
    }

    formData.append('sen', JSON.stringify(data)); //Agregar datos al formData

    let headers = {
        'Accept': 'application/json',
        "token-api": key,
        'rol-user': rol
    };

    const response = await (fetch(URL + recurso, {
        method: "POST",
        headers: headers,
        body: formData,
    }));

    return await response.json();
}

//metodo para conectarse al backend y obtener los usuarios
export async function obtenerP(recurso, key, rol) {

    let headers = {
        'Accept': 'application/json',
        "token-api": key,
        'rol-user': rol
    };

    const datos = await (await fetch(URL + recurso, {
        cache: 'no-store',
        method: "GET",
        headers: headers,

    })).json();
    return datos;
}

//metodo para conectarse al backend y obtener las motas
export async function obtenerM(recurso, key, rol) {

    let headers = {
        'Accept': 'application/json',
        "token-api": key,
        'rol-user': rol
    };

    const datos = await (await fetch(URL + recurso, {
        cache: 'no-store',
        method: "GET",
        headers: headers,

    })).json();
    return datos;
}

//metodo para conectarse al backend y obtener los roles
export async function obtenerR(recurso, key = "", rol) {
    let headers = {};

    headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "token-api": key,
        'rol-user': rol
    };

    const response = await (await fetch(URL + recurso, {
        method: "GET",
        headers: headers,
        cache: 'no-store'
    })).json();
    return response;
}
//metodo para conectarse con el backend y poder iniciar sesion
export async function login(recurso, data, key = "") {
    let headers = {};

    if (key !== "") {
        headers = {

        };
    } else {
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }

    const response = await fetch(URL + recurso, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    return await response.json();
}

//metodo para conectarse con el backend y obtener los datos de los sensores
export async function obtenerData(recurso, key = "", rol) {
    let headers = {};
    headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "token-api": key,
        'rol-user': rol
    };

    const response = await (await fetch(URL + recurso, {
        method: "GET",
        headers: headers,
        cache: 'no-store'
    })).json();

    // console.log("respuesta odcs: " + response)
    return response;
}



//metodo para conectarse con el backend y obtener los sensores


//cambiar estado documentos
export async function cambiarEstado(recurso, data, key = "", rol) {
    let headers = {};

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token-api": key,
        'rol-user': rol
    };

    const response = await (await fetch(URL + recurso, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();

    return response;
}









