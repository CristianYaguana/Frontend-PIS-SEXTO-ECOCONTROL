import { login } from "./Conexion";
import { save, saveToken } from "./SessionUtil";

export async function inicio_sesion(data) {

    const sesion = await login('admin/login', data, "");

    if (sesion.code === 200 && sesion.data.token) {
        saveToken(sesion.data.token);
        save('user', sesion.data.user);
        save('rol', sesion.data.rol);
        save('external', sesion.data.exter)
    }

    return sesion;
}
