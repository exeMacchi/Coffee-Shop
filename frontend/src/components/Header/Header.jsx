import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { logout } from "../../services/authService";
import verifyDarkMode from "../../utilities/verifyDarkMode";

// Icons
import LightIcon from "../Icons/LightIcon";
import DarkIcon from "../Icons/DarkIcon";
import { PrivateRoutes, PublicRoutes } from "../../utilities/routes";


export default function Header({ isHomePage, isAdminPage }) {
    const [darkMode, setDarkMode] = useState(undefined);
    const { isAdminLogged, setAdminLogged } = useAuthContext();
    const navigate = useNavigate();

    /* Modo oscuro */
    useEffect(() => {
        verifyDarkMode(darkMode, setDarkMode);
    }, [darkMode]);

    const handleSwitchDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const handleLogout = async () => {
        const res = await logout();
        if (res.status === 200) {
            setAdminLogged(false);
            navigate(PublicRoutes.HomePage);
        }
        else {
            // TODO: alerta de error de deslogueo.
        }
    }

    return (
        <header className="bg-yellow-900 dark:bg-slate-900 px-3 py-8 sticky top-0 z-50">
            <nav className="max-h-12 columns-3 text-white">
                <div className="flex justify-start items-center">
                    <Link to={PublicRoutes.HomePage}>LOGO</Link>
                </div>

                <div className="flex justify-center gap-4">
                    <Link to={PublicRoutes.HomePage}
                          className={`nav__link ${ isHomePage ? 'bg-orange-950 dark:bg-blue-950' : ''}`}>
                        HOME
                    </Link>
                    <Link to={PrivateRoutes.AdminPage} 
                          className={`nav__link ${ isAdminPage ? 'bg-orange-950 dark:bg-blue-950' : ''}`}>
                        ADMIN
                    </Link>
                </div>

                <div className="flex items-center justify-end gap-3">
                    {
                        isAdminLogged && (
                            <button type="button"
                                    className="btn-primary bg-yellow-950 hover:bg-orange-900 
                                             dark:bg-blue-900 dark:hover:bg-blue-800"
                                    onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        )
                    }

                    <button type="button" 
                            className="bg-orange-950 hover:bg-orange-900 transition 
                                    dark:bg-blue-900 dark:hover:bg-blue-700 
                                    rounded-full p-1" 
                            onClick={handleSwitchDarkMode}>
                        {
                            darkMode ? (
                                <DarkIcon className="size-10"/>
                            ) : (
                                <LightIcon className="size-10"/>
                            )
                        }
                    </button>
                </div>
            </nav>
        </header>
    );
}
