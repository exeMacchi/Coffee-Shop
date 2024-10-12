import { PrivateRoutes, PublicRoutes } from "./routes";

export default function handleAuthOperationResponse(res, navigate, setIsAdminLogged, setAlert) {
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
        case 200:
            setIsAdminLogged(res.data.isAdmin);
            navigate(PrivateRoutes.AdminPage, { replace: true });
            break;

        case 201:
            navigate(PublicRoutes.LoginPage, {
                replace: true,
                state: {
                    alert: true,
                    type: "error",
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

        case 401:
            setAlert({
                isVisible: true,
                type: "error",
                title: "Inicio de sesión incorrecto",
                message: res.data.message
            });
            break;

        case 404:
            setAlert({
                isVisible: true,
                type: "error",
                title: "Usuario incorrecto",
                message: res.data.message
            });
            break;
        
        default:
            // TODO: Error Page
            break;
    }
}
