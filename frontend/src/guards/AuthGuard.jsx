import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../utilities/routes";
import { useAuthContext } from "../providers/AuthProvider";

export default function AuthGuard() {
    const { isAdminLogged } = useAuthContext();

    return isAdminLogged ? (
        <Outlet/>
    ) : (
        <Navigate to={PublicRoutes.LoginPage} 
                  replace={true} 
                  state={{ alert: true, 
                           type: "error",
                           title: "Acceso denegado", 
                           message: "No se tienen los permisos necesarios."}}/>
    ); 
}
