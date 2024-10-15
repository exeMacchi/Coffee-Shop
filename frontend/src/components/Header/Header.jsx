// Build-in
import { useState, useEffect } from "react";
import { useNavigate, NavLink  } from "react-router-dom";

// Utilites
import { useAuthContext } from "../../providers/AuthProvider";
import { logout } from "../../services/authService";
import verifyDarkMode from "../../utilities/verifyDarkMode";
import { PublicRoutes } from "../../utilities/routes";

// Icons
import LightIcon from "../Icons/LightIcon";
import DarkIcon from "../Icons/DarkIcon";
import BarIcon from "../Icons/BarIcon";
import CloseIcon from "../Icons/CloseIcon";

// Componentes
import Navbar from "../Navbar/Navbar";


export default function Header() {
    const { isAdminLogged, setIsAdminLogged } = useAuthContext();
    const navigate = useNavigate();

    /* --- Modo oscuro --- */
    const [darkMode, setDarkMode] = useState(undefined);

    useEffect(() => {
        verifyDarkMode(darkMode, setDarkMode);
    }, [darkMode]);

    const handleSwitchDarkMode = () => {
        setDarkMode(!darkMode);
    }

    /* --- Menu Responsive --- */
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /* --- Cerrar Sesion --- */
    const handleLogout = async () => {
        const res = await logout();
        if (res.status === 200) {
            setIsAdminLogged(false);
            navigate(PublicRoutes.HomePage);
        }
        else {
            setIsAdminLogged(false);
            navigate(PublicRoutes.ErrorPage, {
                replace: true,
                state: {
                    alert: true,
                    type: "error",
                    title: res.data?.titleError,
                    message: res.data?.message
                }
            });
        }
    }

    return (
        <header className="sticky top-0 z-50">
            <div className="bg-yellow-900 dark:bg-slate-900 px-3 py-8">
                <nav className="max-h-12 text-white grid grid-cols-2 md:grid-cols-3 relative z-40">
                    <div className="flex items-center">
                        <NavLink to={PublicRoutes.HomePage}>LOGO</NavLink>
                    </div>

                    <div className="hidden md:flex justify-center gap-4">
                        <Navbar/>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        {
                            isAdminLogged && (
                                <button type="button"
                                        className="btn-primary hidden md:block bg-yellow-950 hover:bg-orange-900 
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

                        <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {
                            isMenuOpen ? (
                                <CloseIcon className="size-10 md:hidden transition duration-200 ease-in-out hover:scale-125"/>
                            ) : (
                                <BarIcon className="size-10 md:hidden transition duration-200 ease-in-out hover:scale-125"/>
                            )
                        }
                        </button>
                    </div>
                </nav>
            </div>
            <div className={`absolute left-0 top-0 -z-50 p-4 opacity-100 text-white
                            flex md:hidden flex-col gap-4 bg-orange-200 dark:bg-blue-500 w-full
                            transition-transform duration-700 ease-in-out
                            ${ isMenuOpen 
                               ? "translate-y-28" 
                               : "-translate-y-28 pointer-events-none"}`}>
                <Navbar/>
                {
                    isAdminLogged && (
                        <button type="button"
                                className="nav__link block md:hidden uppercase"
                                onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    )
                }
            </div>
        </header>
    );
}
