import { PrivateRoutes, PublicRoutes } from "./routes";

export default function handleAdminOperationResponse(res, navigate, setAlert) {
    if (!res) {
        setAlert({
            isVisible: true,
            type: "error",
            title: "Error de red",
            message: "No se pudo conectar con el servidor. Inténtelo de nuevo más tarde."
        });
        return;
    }

    switch (res.status) {
        // Un producto se modifica, crea o elimina exitosamente
        case 200: case 201: case 204:
            navigate(PrivateRoutes.AdminPage, { 
                replace: true,
                state: {
                    alert: true,
                    type: "success",
                    title: "Operación exitosa",
                    message: res.data.message
                }
            });
            break;

        // Error en la sintaxis 
        case 400:
            setAlert({
                isVisible: true,
                type: "error",
                title: "Operación fallida",
                message: res.data.message
            });
            break;

        // Error de autenticación
        case 401: case 403:
            navigate(PublicRoutes.LoginPage, { 
                replace: true,
                state: {
                    alert: true,
                    type: "error",
                    title: "Acceso denegado",
                    message: res.data.message
                }
            });
            break;

        // Error de servidor
        default:
            navigate(PublicRoutes.ErrorPage, {
                replace: true,
                state: {
                    alert: true,
                    type: "error",
                    title: res.data.titleError,
                    message: res.data.message
                }
            });
            break;
    }
}
