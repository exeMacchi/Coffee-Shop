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
        case 200: case 201: case 204:
            navigate(PrivateRoutes.AdminPage, { 
                replace: true,
                state: {
                    alert: "success",
                    title: "Operación exitosa",
                    message: res.data.message
                }
            });
            break;

        case 400:
            setAlert({
                isVisible: true,
                type: "error",
                title: "Operación fallida",
                message: res.data.message
            });
            break;

        case 401: case 403:
            navigate(PublicRoutes.LoginPage, { 
                replace: true,
                state: {
                    alert: "error",
                    title: "Acceso denegado",
                    message: res.data.message
                }
            });
            break;

        default:
            // TODO: Error Page
            break;
    }
}
